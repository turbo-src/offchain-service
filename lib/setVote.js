const { Repo, PullRequest, Vote } = require("../server/db");
const getContributorTokenAmount = require("./getContributorTokenAmount");
const updatePullRequest = require("./updatePullRequest");

async function setVote(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*defaultHash:*/ defaultHash,
  /*childDefaultHash:*/childDefaultHash,
  /*mergeable:*/ mergeable,
  /*contributor_id:*/ contributor_id,
  /*side:*/ side
) {
  try {

    // Ensure token.status returns a 200
    // and token.amount > 0.
    let pullRequest = await PullRequest.findOne({
      where: { defaultHash: defaultHash, repo_id: repo_id },
    });

    let repo = await Repo.findOne({
      where: { repo_id: repo_id },
    });

    if (!pullRequest) {
      console.log("pull request doesn't exist")
      return 404; //Not found
    }

    if (defaultHash !== childDefaultHash) {
      // Update of merge hash and mergeable state.
      const upRes = await updatePullRequest(
        repo_id,
        defaultHash,
        childDefaultHash,
        mergeable
      );
      if (upRes === 201) {
	// get new instance of pull request after above update
        pullRequest = await PullRequest.findOne({
          where: { defaultHash: defaultHash, repo_id: repo_id },
        });
      } else {
        return 403; // Appropriate status code?
      }
    }

    // Only vote on new or open pull requests.
    const voteable = (pullRequest.state === 'open' || pullRequest.state === 'pre-open' || pullRequest.state === 'new')
    if (!voteable) {
        return 403; // Appropriate status code?
    }

    // Check if contributor has already voted on this pull request.
    const data = await PullRequest.findOne({ where: {defaultHash: defaultHash, repo_id: repo_id},
            include: {
                model : Vote
            }
    });
    const json = JSON.stringify(data, 2, null);
    const obj = JSON.parse(json);
    const votes = obj.votes;
    const duplicateVote = votes.some(vote => vote.contributor_id === contributor_id);
    
    if (duplicateVote) {
      console.log("duplicate");
      return 403;
    } else {
      let repoJSON = JSON.stringify(pullRequest, 2, null);

      repo = JSON.parse(repoJSON);

      let vote = await Vote.create({
        contributor_id: contributor_id,
        defaultHash: defaultHash,
        side: side,
      });

      await vote.setPullrequest(pullRequest.id);

      let tokens = await getContributorTokenAmount(
        /*owner:*/ "",
        /*repo:*/ repo_id,
        /*defaultHash:*/ defaultHash,
        /*contributor_id:*/ contributor_id,
        /*side:*/ ""
      );
      // Should also check if tokens.status === 404
      if (Number(tokens.amount) < 1) {
         return 403
      }

      if (side === "yes") {
        let newTotal = Number(pullRequest.yesTokenAmount) + Number(tokens.amount);
        await pullRequest.update({
          yesTokenAmount: String(newTotal),
          where: { id: pullRequest.id },
        });
      }
      if (side === "no") {
        let newTotal = Number(pullRequest.noTokenAmount) + Number(tokens.amount);
        await pullRequest.update({
          noTokenAmount: String(newTotal),
          where: { id: pullRequest.id },
        });
      }

      return 201;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
}

module.exports = setVote;
