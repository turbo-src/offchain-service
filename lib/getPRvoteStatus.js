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
    if (pr.state === 'open') {
      return { state: 200, type: 0 }
    } else if (pr.state === 'close') {
      return { state: 200, type: 1 }
    } else if (pr.state === 'merge') {
      return { state: 200, type: 2 }
    } else {
      return { state: 200, type: 3 }
    }
  } catch (error) {
    console.log(error);
   return { state: 500, type: 0 }
  }
}
module.exports = getPRvoteStatus;