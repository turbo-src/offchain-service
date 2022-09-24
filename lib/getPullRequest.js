const { PullRequest } = require("../server/db");

async function getPullRequest(
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
    if (pr !== null) {
      console.log('getPullRequest ' + pr.state)
      console.log('defaultHash ' + pr.defaultHash)
      console.log('childDefaultHash ' + pr.childDefaultHash)
      return {
               status: 200,
               state: pr.state,
               repo_id: pr.repo_id,
               fork_branch: pr.fork_branch,
               defaultHash: pr.defaultHash,
               childDefaultHash: pr.childDefaultHash
             }
    } else {
      return { 
               status: 404,
               state: "",
               repo_id: repo_id,
               fork_branch: "",
               defaultHash: defaultHash,
               childDefaultHash: ""
             }
       }
   
  } catch (error) {
    console.log(error);
   return { 
	    status: 500,
	    state: "",
	    repo_id: repo_id,
	    fork_branch: "",
	    defaultHash: "",
	    childDefaultHash: ""
          }
  }
}
module.exports = getPullRequest;
