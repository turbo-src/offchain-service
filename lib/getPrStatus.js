import { PullRequest } from "../../db/index.js";
export default async function getPrStatus(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, pr_id: pr_id },
    });
    return pr.status;
  } catch (error) {
    console.log(error);
    return 404;
  }
}
