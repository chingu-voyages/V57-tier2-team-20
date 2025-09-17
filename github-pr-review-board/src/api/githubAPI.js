import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

// List of Pull Requests
export async function getPullRequests(org, repo, state) {
  return fetchAPI(`/repos/${org}/${repo}/pulls?state=all&per_page=100`);
}

// List of Repos
export async function getRepos(org) {
  return fetchAPI(`/orgs/${org}/repos`);
}

//fetch
async function fetchAPI(url) {
  try {
    const response = await octokit.request(url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    throw err;
  }
}
