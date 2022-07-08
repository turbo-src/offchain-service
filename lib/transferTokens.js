import { Token, Contributor, Repo } from "../db/index.js";
import getAuthorizedContributor from "./getAuthorizedContributor.js";
export default async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from_contributor_id,
  /*to:*/ to_contributor_id,
  /*amount:*/ amount
) {
  try {
    let from = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo_id:*/ repo_id,
      /*pr_id:*/ "",
      /*contributor_id:*/ from_contributor_id,
      /*side:*/ ""
    );
    // if (!from) {
    //   return "Not authorized";
    // }
    await Token.create({
      from: from_contributor_id,
      to: to_contributor_id,
      repo_id: repo_id,
      amount: String(amount),
    });
  } catch (error) {
    return error;
  }
}
