import { logger } from "./logger";

/**
 * GitHub API response for a user
 * Based on: https://docs.github.com/en/rest/users/users
 */
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch GitHub user data by username
 * @param username - GitHub username
 * @returns GitHub user data or null if not found
 */
export async function fetchGitHubUser(
  username: string,
): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      // Cache for 1 hour to respect GitHub API rate limits
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        logger.github.warn(`GitHub user not found: ${username}`);
        return null;
      }
      if (response.status === 403) {
        logger.github.error(`GitHub API rate limit exceeded`);
        return null;
      }
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: GitHubUser = await response.json();
    return data;
  } catch (error) {
    logger.github.error(`Failed to fetch GitHub user ${username}:`, { error });
    return null;
  }
}

/**
 * Fetch multiple GitHub users in parallel
 * @param usernames - Array of GitHub usernames
 * @returns Array of GitHub user data (null for users not found)
 */
export async function fetchGitHubUsers(
  usernames: string[],
): Promise<(GitHubUser | null)[]> {
  const promises = usernames.map((username) => fetchGitHubUser(username));
  return Promise.all(promises);
}
