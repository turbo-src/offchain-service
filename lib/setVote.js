const { Repo, PullRequest, Vote } = require("../server/db");
const getContributorTokenAmount = require("./getContributorTokenAmount");

async function setVote(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor_id:*/ contributor_id,
  /*side:*/ side
) {
  try {

    // Ensure token.status returns a 200
    // and token.amount > 0.
    let pullRequest = await PullRequest.findOne({
      where: { pr_id: pr_id, repo_id: repo_id },
    });

    let repo = await Repo.findOne({
      where: { repo_id: repo_id },
    });

    if (!pullRequest) {
      pullRequest = await PullRequest.create({
        pr_id: pr_id,
        repo_id: repo_id,
      });
      await repo.addPullrequest(pullRequest.id);
    }

    const duplicateVote = await Vote.findOne({
      where: { pr_id: pr_id, contributor_id: contributor_id },
    });

    if (duplicateVote) {
      console.log("duplicate");
      return 403;
    } else {
      let repoJSON = JSON.stringify(pullRequest, 2, null);

      repo = JSON.parse(repoJSON);

      let vote = await Vote.create({
        contributor_id: contributor_id,
        pr_id: pr_id,
        side: side,
      });

      await vote.setPullrequest(pullRequest.id);

      let tokens = await getContributorTokenAmount(
        /*owner:*/ "",
        /*repo:*/ repo_id,
        /*pr_id:*/ pr_id,
        /*contributor_id:*/ contributor_id,
        /*side:*/ ""
      );

      if (side === "yes") {
        let newTotal = Number(pullRequest.yesTokenAmount) + tokens.amount;
        await pullRequest.update({
          yesTokenAmount: String(newTotal),
          where: { id: pullRequest.id },
        });
      }
      if (side === "no") {
        let newTotal = Number(pullRequest.noTokenAmount) + tokens.amount;
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
