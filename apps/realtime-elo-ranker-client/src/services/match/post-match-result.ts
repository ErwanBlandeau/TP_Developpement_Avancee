import { MatchResult } from "@realtime-elo-ranker/libs/ui";

const URL = "/post/match";

/**
 * Post the result of a match.
 * 
 * @param {string} baseUrl The base URL of the API
 * @param {string} adversaire1 The ID of the first adversary
 * @param {string} adversaire2 The ID of the second adversary
 * @param {MatchResult} result The result of the match
 */
export default function postMatchResult(baseUrl: string, adversaire1: string, adversaire2: string, result: MatchResult): Promise<Response> {
  console.log(`Posting match result: adversaire1=${adversaire1}, adversaire2=${adversaire2}, result=${result}`);
  return fetch(baseUrl + URL, {
    method: "POST",
    body: JSON.stringify({
      adversaire1: adversaire1,
      adversaire2: adversaire2,
      winner: result === MatchResult.LEFT_WIN ? adversaire1 : result === MatchResult.RIGHT_WIN ? adversaire2 : null,
      draw: result === MatchResult.DRAW ? true : false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}