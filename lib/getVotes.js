const { PullRequest, Vote } = require("../server/db");

async function getVotes(
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
) {
  try {
    let pr = await PullRequest.findOne({
      where: { repo_id: repo_id, defaultHash: defaultHash },
      include: { model: Vote, order: [["createdAt", "DESC"]] },
    });
    console.log('getvotes repo_id =>', repo_id)
    console.log('getvotes defaultHash =>', defaultHash)
    console.log('getvotes PR =>', pr)
      // order by newest first
    let json = JSON.stringify(pr, null, 2);
    let data = JSON.parse(json);
    let votes = data?.votes.map((vote) => { 
        return {
            contributor_id: vote.contributor_id,
            votePower: vote.votePower,
            side: vote.side,
            createdAt: vote.createdAt,
        }
    })
    return { status: 200, votes: votes }
  } catch (error) {
    console.log(error);
    return error.status
  }
}
module.exports = getVotes;
