//List of Repo
export async function getRepos(org, token) {
  const url = `https://api.github.com/orgs/${org}/repos`;
  return fetchGitHub(url, token);
}

// List of Pull Requests
export async function getPullRequests(org, repo, token, state) {
  const url = `https://api.github.com/repos/${org}/${repo}/pulls?state=${state}`;
  return fetchGitHub(url, token);
}

async function fetchGitHub(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub API Error ${response.status}: ${message}`);
  }

  return response.json();
}
