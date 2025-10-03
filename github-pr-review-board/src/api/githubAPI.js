import { Octokit } from "@octokit/rest";
import { timeAgo } from "../utils/dateConverter";

const octokit = new Octokit({
  //auth: import.meta.env.VITE_GITHUB_TOKEN,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

async function fetchAPI(url) {
  try {
    // const response = await octokit.request(url);
    const response = await fetch(`https://github-pr-board.backend-iaas.workers.dev/?url=${url}`);
    if (!response.ok) {
        const error = new Error(response.statusText)
        error.status = response.status
        throw error
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    throw err;
  }
}

// List of Repos
export async function getRepos(org) {
  return fetchAPI(`/orgs/${org}/repos`);
}

// List of Events
export async function getPREvents(org, repo, prNumber) {
  return fetchAPI(`/repos/${org}/${repo}/issues/${prNumber}/events`);
}

// List of comments
export async function getPRComments(org, repo, prNumber) {
  return fetchAPI(
    `/repos/${org}/${repo}/issues/${prNumber}/comments?per_page=3&direction=desc`
  );
}

// List of Reviews
export async function getPRReviews(org, repo, prNumber) {
  return fetchAPI(
    `/repos/${org}/${repo}/pulls/${prNumber}/reviews?per_page=3&direction=desc`
  );
}

// List of commits
export async function getPRCommits(org, repo, prNumber) {
  return fetchAPI(`/repos/${org}/${repo}/pulls/${prNumber}/commits`);
}

//List of Pull Requests
export async function getPullRequests(org, repo, state) {
  const info = await fetchAPI(
    `/repos/${org}/${repo}/pulls?state=${state}&per_page=100`
  );

  //Without activities
  return info.map((pr) => ({
    title: pr.title,
    number: pr.number,
    pr_url: pr.html_url,
    created_at: timeAgo(pr.created_at),
    author: pr.user.login,
    authorUrl: `https://github.com/${pr.user.login}`,
    fromBranch: pr.head.ref,
    fromBranchUrl: `${pr.base.repo.html_url}/tree/${pr.head.ref}`,
    toBranch: pr.base.ref,
    toBranchUrl: `${pr.base.repo.html_url}/tree/${pr.base.ref}`,
    orgName: pr.base.repo.owner.login,
    orgUrl: pr.base.repo.owner.html_url,
    repoName: pr.base.repo.name,
    repoUrl: pr.base.repo.html_url,
    reviewers: pr.requested_reviewers?.length
      ? pr.requested_reviewers.map((user) => ({
          login: user.login,
          url: `https://github.com/${user.login}`,
        }))
      : [],
    activities: null,
    state:pr.state,
    merged:pr.merged_at
  }));

  //With activities
  //   return Promise.all(
  //     info.map(async (pr) => ({
  //       title: pr.title,
  //       number: pr.number,
  //       pr_url: pr.html_url,
  //       created_at: timeAgo(pr.created_at),
  //       author: pr.user.login,
  //       authorUrl: `https://github.com/${pr.user.login}`,
  //       fromBranch: pr.head.ref,
  //       fromBranchUrl: `${pr.base.repo.html_url}/tree/${pr.head.ref}`,
  //       toBranch: pr.base.ref,
  //       toBranchUrl: `${pr.base.repo.html_url}/tree/${pr.base.ref}`,
  //       orgName: pr.base.repo.owner.login,
  //       orgUrl: pr.base.repo.owner.html_url,
  //       repoName: pr.base.repo.name,
  //       repoUrl: pr.base.repo.html_url,
  //       reviewers: pr.requested_reviewers?.length
  //         ? pr.requested_reviewers.map((user) => ({
  //             login: user.login,
  //             url: `https://github.com/${user.login}`,
  //           }))
  //         : [],
  //       activities: await getPullRequestEvents(org, repo, pr.number),
  //     }))
  //   );
}

//Get last 3 events
export async function getPullRequestEvents(org, repo, prNumber) {
  const [events, comments, reviews, commits] = await Promise.all([
    getPREvents(org, repo, prNumber),
    getPRComments(org, repo, prNumber),
    getPRReviews(org, repo, prNumber),
    getPRCommits(org, repo, prNumber),
  ]);

  // Join all activities
  const allActivities = [...events, ...comments, ...reviews, ...commits]
    .sort(
      (a, b) =>
        new Date(a.created_at || a.submitted_at || a.commit?.author?.date) -
        new Date(b.created_at || b.submitted_at || b.commit?.author?.date)
    )
    .slice(-3) // last 3
    .map((a) => ({
      type: (
        a.type ||
        a.state ||
        a.event ||
        (a.commit ? "commit" : "commented")
      )
        .replace(/_/g, " ")
        .toLowerCase(),
      created_at: a.created_at || a.submitted_at || a.commit?.author?.date,
    }));

  return allActivities;
}
