const { Repo, PullRequest, Vote } = require("../server/db");
const getContributorTokenAmount = require("./getContributorTokenAmount")

async function getRepoData(repo_id, contributor_id) {
  try {
          const data = await Repo.findOne({ where: { repo_id: repo_id },
            include: { model: PullRequest, include: { model: Vote } }
          });
          const json = JSON.stringify(data, null, 2);
          const repo = JSON.parse(json);

          const contributorToken = await getContributorTokenAmount(
          /*owner:*/ "",
          /*repo:*/ repo_id,
          /*defaultHash:*/ "",
          /*contributor_id:*/ contributor_id,
          /*side:*/ "")

          if(!repo) {
            throw new Error
          }
          
          const response =  {
      status: 200,  
      repo_id: repo.repo_id,
      owner: repo.owner,
      contributor_id: repo.contributor_id,
      head: repo.head,
      quorum: repo.quorum,
      contributor: {
        contributor: parseInt(contributorToken.amount) >= 1 ? true : false,
        votePower: parseInt(contributorToken.amount),
      },
      pullRequests: repo.pullrequests
    };
    console.log('getRepoData:', response)
    return response
  } catch (error) {
    console.log(error);
    return {
        status: 500,  
      };
  }
}

module.exports = getRepoData;
