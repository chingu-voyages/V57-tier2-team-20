import { timeAgo } from "../utils/dateConverter"
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

async function fetchAPI(query) {
    try {
        // const response = await octokit.request(url);
        const response = await fetch(
            `https://github-pr-board-graphql.backend-iaas.workers.dev/?query=${encodeURIComponent(
                query
            )}`
        )
        console.log("Response: ", response);
        if (!response.ok) {
            const error = new Error(response.statusText)
            error.status = response.status
            throw error
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error(`Error fetching: `, err)
        throw err
    }
}

// List of Pull Request
export async function getPullRequests(org, repo, state) {
    const states =
        state === "closed" ? ["CLOSED", "MERGED"] : [state.toUpperCase()]

    const query = `
  query {
    repository(owner: "${org}", name: "${repo}") {
         pullRequests(
      first: 100,
      states: [${states.join(
          ","
      )}], orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          title
          url
          number
          createdAt
          state
          author {
            login
            url
          }
          headRefName
          baseRefName
          baseRepository {
            name
            url
            owner {
              login
              url
            }
          }
          reviewRequests(first: 100) {
            nodes {
              requestedReviewer {
                ... on User {
                  login
                  url
                }
              }
            }
          }

          # Activities
         timelineItems(last: 3) {
              nodes {
                type: __typename
                ... on PullRequestCommit { commit { committedDate } }
                ... on PullRequestReview { created_at: submittedAt state }
                ... on IssueComment { created_at: createdAt }
                ... on MergedEvent { created_at: createdAt }
                ... on ClosedEvent { created_at: createdAt }
                ... on HeadRefDeletedEvent { created_at: createdAt }
                ... on HeadRefRestoredEvent { created_at: createdAt }
                ... on ReviewRequestedEvent { created_at: createdAt }
                ... on ReviewRequestRemovedEvent { created_at: createdAt }
                ... on ReadyForReviewEvent { created_at: createdAt }
                ... on ReopenedEvent { created_at: createdAt }
                ... on LabeledEvent { created_at: createdAt }
                ... on UnlabeledEvent { created_at: createdAt }
                ... on AssignedEvent { created_at: createdAt }
                ... on UnassignedEvent { created_at: createdAt }
                ... on CrossReferencedEvent { created_at: createdAt }
              }
            }
        }
      }
    }
  }
`

    const info = await fetchAPI(query)

    const prs = info.map((pr) => ({
        title: pr.title,
        number: pr.number,
        pr_url: pr.url,
        created_at: timeAgo(pr.createdAt),
        author: pr.author?.login,
        authorUrl: pr.author?.url,
        fromBranch: pr.headRefName,
        fromBranchUrl: `${pr.baseRepository?.url}/tree/${pr.headRefName}`,
        toBranch: pr.baseRefName,
        toBranchUrl: `${pr.baseRepository?.url}/tree/${pr.baseRefName}`,
        orgName: pr.baseRepository?.owner?.login,
        orgUrl: pr.baseRepository?.owner?.url,
        repoName: pr.baseRepository?.name,
        repoUrl: pr.baseRepository?.url,
        state: pr.state?.toLowerCase() || "",
        reviewers:
            pr.reviewRequests?.nodes.map((r) => ({
                login: r.requestedReviewer?.login,
                url: r.requestedReviewer?.url,
            })) || [],
        activities: [
            ...(pr.timelineItems.nodes.length < 3
                ? [{ type: "opened", created_at: timeAgo(pr.createdAt) }]
                : []),

            ...pr.timelineItems.nodes.map((a) => ({
                type: (a.type === "PullRequestReview" ? a.state : a.type)
                    .replace(/Event$/, "")
                    .replace(/^PullRequest/, "")
                    .replace(/([a-z0-9])([A-Z])|_/g, "$1 $2")
                    .toLowerCase(),
                created_at: timeAgo(a.created_at || a.commit?.committedDate),
            })),
        ],
    }))

    return prs
}
