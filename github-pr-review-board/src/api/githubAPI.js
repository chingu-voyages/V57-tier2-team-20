import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  // auth: import.meta.env.VITE_GITHUB_TOKEN,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

async function fetchAPI(url) {
  try {
    const response = await octokit.request(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    throw err;
  }
}

// List of Pull Requests
export async function getPullRequests(org, repo, state) {
  return fetchAPI(`/repos/${org}/${repo}/pulls?state=${state}&per_page=100`);
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
      ).replace(/_/g, " "),
      created_at: a.created_at || a.submitted_at || a.commit?.author?.date,
    }));

  return allActivities;
}
