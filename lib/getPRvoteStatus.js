const { PullRequest } = require("../server/db");

async function getPRvoteStatus(
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
    console.log("pr.status = " + pr.status);
    if (pr.status === "open") {
      return {
        status: 200,
        type: 0,
        branch: pr.branch,
        head: pr.head,
        defaultHash: pr.defaultHash,
      };
    } else if (pr.status === "close") {
      return {
        status: 200,
        type: 1,
        branch: pr.branch,
        head: pr.head,
        defaultHash: pr.defaultHash,
      };
    } else if (pr.status === "merge") {
      return {
        status: 200,
        type: 2,
        branch: pr.branch,
        head: pr.head,
        defaultHash: pr.defaultHash,
      };
    } else {
      return {
        status: 200,
        type: 3,
        branch: pr.branch,
        head: pr.head,
        defaultHash: pr.defaultHash,
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, type: 0 };
  }
}
module.exports = getPRvoteStatus;
