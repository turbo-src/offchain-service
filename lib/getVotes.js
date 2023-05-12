const { PullRequest, Vote } = require("../server/db");

async function getVotes(
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*contributor_id*/ contributor_id
) {
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, defaultHash: defaultHash },
      include: { model: Vote, order: [["createdAt", "DESC"]] },
    });
      // order by newest first
    let json = JSON.stringify(pr, null, 2);
    let data = JSON.parse(json);

    let response = {
      status: 200,
      repo_id: repo_id,
      title: data.title || 'no data for title in engine',
      head: data.head || 'no data for head in engine',
      remoteURL: data.remoteURL || 'no data for remoteURL in engine',
      baseBranch: data.baseBranch || 'no data for baseBranch in engine',
      forkBranch: data.fork_branch || 'no data for forkBranch in engine',
      childDefaultHash: data.childDefaultHash || 'no data for childDefaultHash in engine',
      defaultHash: data.defaultHash || 'no data for defaultHash in engine',
      mergeable: data.mergeable || 'no data for mergeable in engine',
      state: data.state || 'no data for state in engine',
      voteData: {
        contributor: {
          voted: false,
          side: '',
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
        },
        votes: [],
        }
    }

    response.voteData.votes = data?.votes.map((vote) => {
      vote.votePower = parseInt(vote.votePower)
      if(vote.contributor_id === contributor_id) {
        response.voteData.contributor.voted = true,
        response.voteData.contributor.contributor_id = vote.contributor_id
        response.voteData.contributor.side = vote.side,
        response.voteData.contributor.votePower = vote.votePower,
        response.voteData.contributor.createdAt = vote.createdAt
      }
        return {
            contributor_id: vote.contributor_id,
            votePower: vote.votePower,
            side: vote.side,
            createdAt: vote.createdAt,
        }
    }) 

    response.voteData.voteTotals.totalNoVotes = parseInt(data.noTokenAmount) || 0
    response.voteData.voteTotals.totalYesVotes = parseInt(data.yesTokenAmount) || 0
    response.voteData.voteTotals.totalVotes = (response.voteData.voteTotals.totalNoVotes + response.voteData.voteTotals.totalYesVotes) || 0
    response.voteData.voteTotals.yesPercent = (parseInt(data.yesTokenAmount) / 1_000_000) || 0
    response.voteData.voteTotals.noPercent = (parseInt(data.noTokenAmount) / 1_000_000) || 0
    response.voteData.voteTotals.totalVotePercent = (response.voteData.voteTotals.yesPercent + response.voteData.voteTotals.noPercent) || 0

    return response
  } catch (error) {
    console.log(error);
    return 500
  }
}
module.exports = getVotes;
