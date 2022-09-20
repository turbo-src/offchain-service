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
    console.log('pr.state = ' + pr.state)
    return { status: 200, state: pr.state, repo_id: pr.repo_id }
  } catch (error) {
    console.log(error);
   return { status: 500, state: pr.state, repo_id: repo_id  }
  }
}
module.exports = getPRvoteStatus;
