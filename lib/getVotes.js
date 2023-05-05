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
      title: data.title || '',
      head: data.head || '',
      remoteUrl: data.remoteUrl || '',
      baseBranch: data.baseBranch || '',
      forkBranch: data.fork_branch || '',
      childDefaultHash: data.childDefaultHash || '',
      defaultHash: data.defaultHash || '',
      mergeable: data.mergeable || true,
      state: data.state || '',
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
          totalVotePercent: "0%",
          yesPercent: "0%",
          noPercent: "0%",
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

    response.voteData.voteTotals.totalNoVotes = parseInt(data.noTokenAmount)
    response.voteData.voteTotals.totalYesVotes = parseInt(data.yesTokenAmount)
    // response.voteData.voteTotals.totalVotes = parseInt(Math.round(data.noTokenAmount + data.yesTokenAmount))
    console.log('response getVotes', response)
    return response
  } catch (error) {
    console.log(error);
    return { status: error.status, message: error.message }
  }
}
module.exports = getVotes;
