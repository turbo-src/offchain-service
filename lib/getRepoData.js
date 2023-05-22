const { Repo, PullRequest, Vote } = require("../server/db");
const getContributorTokenAmount = require("./getContributorTokenAmount")
const getVotes = require("./getVotes")

async function getRepoData(repo_id, contributor_id) {
  let response =  {
    status: 200,  
    repo_id: "",
    owner: "",
    contributor_id: "",
    head: "",
    quorum: .5,
    contributor: {
      contributor_id: "",
      contributor: false,
      votePower: 0,
    },
    pullRequests: []
  };
  try {
          const data = await Repo.findOne({ where: { repo_id: repo_id },
            include: { model: PullRequest, include: { model: Vote } }
          });
          const json = JSON.stringify(data, null, 2);
          const repo = JSON.parse(json);

          if(!data){
            throw new Error
          }

          const contributorToken = await getContributorTokenAmount(
          /*owner:*/ "",
          /*repo:*/ repo_id,
          /*defaultHash:*/ "",
          /*contributor_id:*/ contributor_id,
          /*side:*/ "")
          
          const votePower = parseInt(contributorToken.amount) || 0

          const pullRequestsData = await Promise.all(repo.pullrequests.map(async (pullRequest) => {
          return await getVotes(pullRequest.repo_id, pullRequest.defaultHash, contributor_id)
          }));
          
          console.log('pullRequestsData', pullRequestsData)

          response.repo_id = repo.repo_id,
          response.owner = repo.owner,
          response.contributor_id = repo.contributor_id,
          response.head = repo.head,
          response.quorum = parseInt(repo.quorum) || .5,
          response.contributor.contributor_id = contributor_id,
          response.contributor.contributor = votePower >= 1 ? true : false,
          response.contributor.votePower = votePower,
          response.pullRequests = pullRequestsData

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
