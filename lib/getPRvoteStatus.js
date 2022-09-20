const { PullRequest } = require("../server/db");

async function getPRvoteStatus(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, defaultHash: defaultHash },
    });
    console.log('pr.state = ' + pr.state)
    console.log('pr.fork_branch = ' + pr.fork_branch)
    return {
	     status: 200,
	     state: pr.state,
	     repo_id: pr.repo_id,
	     fork_branch: pr.fork_branch,
	     defaultHash: pr.defaultHash,
	     childDefaultHash: pr.childDefaultHash
           }
  } catch (error) {
    console.log(error);
   return { 
	    status: 500,
	    state: pr.state,
	    repo_id: repo_id,
	    fork_branch: "",
	    defaultHash: "",
	    childDefaultHash: ""
          }
  }
}
module.exports = getPRvoteStatus;
