const { PullRequest, Vote } = require("../server/db");
const getVotePowerAmount = require("./getVotePowerAmount")

async function getVotes(
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor_id*/ contributor_id
) {
  let response = {
      status: 200,
      repo_id: repo_id,
      issue_id: "" || 'no data for issue id in engine',
      title: "" || 'no data for title in engine',
      head: "" || 'no data for head in engine',
      remoteURL: "" || 'no data for remoteURL in engine',
      baseBranch: "" || 'no data for baseBranch in engine',
      forkBranch: "" || 'no data for forkBranch in engine',
      childDefaultHash: "" || 'no data for childDefaultHash in engine',
      defaultHash: "" || 'no data for defaultHash in engine',
      mergeable: false,
      state: "" || 'no data for state in engine',
      voteData: {
        contributor: {
          voted: false,
          side: false,
          votePower: 0,
          createdAt: '',
          contributor_id: ''
        },
        voteTotals: {
          totalVotes: 0,
          totalYesVotes: 0,
          totalNoVotes: 0,
          votesToQuorum: 0,
          votesToMerge: 0,
          votesToClose: 0,
          totalVotePercent: 0,
          yesPercent: 0,
          noPercent: 0,
          quorum: .5,
        },
        votes: [],
        }
  }
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, defaultHash: defaultHash },
      include: { model: Vote, order: [["createdAt", "DESC"]] },
    });

    const contributorToken = await getVotePowerAmount("", repo_id, "", contributor_id, "")
    const votePower = parseInt(contributorToken.amount) || 0
    response.voteData.contributor.votePower = votePower

    if(!pr) {
      response.status = 404
      response.voteData.contributor.contributor_id = contributor_id
      return response
    }
    
    // order by newest first
    let json = JSON.stringify(pr, null, 2);
    let data = JSON.parse(json);

    // Set pull request meta data:
    response.status = 200
    response.repo_id = repo_id
    response.title = data.title || 'no data for title in engine'
    response.head = data.head || 'no data for head in engine'
    response.remoteURL = data.remoteURL || 'no data for remoteURL in engine'
    response.baseBranch = data.baseBranch || 'no data for baseBranch in engine'
    response.forkBranch = data.fork_branch || 'no data for forkBranch in engine'
    response.childDefaultHash = data.childDefaultHash || 'no data for childDefaultHash in engine'
    response.defaultHash = data.defaultHash || 'no data for defaultHash in engine'
    response.mergeable = data.mergeable || 'no data for mergeable in engine'
    response.state = data.state || 'no data for state in engine'
    response.issue_id = data.issue_id || 'no data for state in engine'

  // Set pull request votes data and contributor vote data
    response.voteData.votes = data?.votes.map((vote) => {
      if(vote.contributor_id === contributor_id) {
        response.voteData.contributor.voted = true,
        response.voteData.contributor.contributor_id = vote.contributor_id
        response.voteData.contributor.side = vote.side,
        response.voteData.contributor.createdAt = vote.createdAt
      }
        return {
            contributor_id: vote.contributor_id,
            votePower: vote.votePower,
            side: vote.side,
            createdAt: vote.createdAt,
        }
    }) 

    //Set pull request vote totals data
    response.voteData.voteTotals.totalNoVotes = parseInt(data.noTokenAmount) || 0
    response.voteData.voteTotals.totalYesVotes = parseInt(data.yesTokenAmount) || 0
    response.voteData.voteTotals.totalVotes = (response.voteData.voteTotals.totalNoVotes + response.voteData.voteTotals.totalYesVotes) || 0
    response.voteData.voteTotals.yesPercent = (parseInt(data.yesTokenAmount) / 1_000_000) || 0
    response.voteData.voteTotals.noPercent = (parseInt(data.noTokenAmount) / 1_000_000) || 0
    response.voteData.voteTotals.totalVotePercent = (response.voteData.voteTotals.yesPercent + response.voteData.voteTotals.noPercent) || 0
    response.voteData.voteTotals.quorum = parseInt(data.quorum) || .5
    
    return response
  } catch (error) {
    console.log(error)
    return {status: 500}
  }
}
module.exports = getVotes;
