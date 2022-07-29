import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createUser from "../lib/createUser.js";
import transferTokens from "../lib/transferTokens.js";
import getVoteNoTotals from "../lib/state/getVoteNoTotals.js";
import getVoteYesTotals from "../lib/state/getVoteYesTotals.js";
import getVoteTotals from "../lib/state/getVoteTotals.js";
import createPullRequest from "../lib/createPullRequest.js";
import setVote from "../lib/setVote.js";
import getVoteStatus from "../lib/state/getVoteStatus.js";

describe("Two voters vote - exceed quorum.", function () {
  it("Should add votes to the votes table, add yes/noTokensAmount to the pullRequest table, set PR status to merge when majority is reached", async function () {
    let michaelVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    const voteYesTotals = await getVoteYesTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const voteNoTotals = await getVoteNoTotals(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    const openStatus = await getVoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let maryVote = await setVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*side:*/ "yes"
    );

    const mergeStatus = await getVoteStatus(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "",
      /*side:*/ ""
    );

    assert.equal(michaelVote, 204, "Fail to add vote to database");
    assert.equal(maryVote, 204, "Fail to add vote to database");
    assert.equal(voteYesTotals, "50000", "Fail to add votes yes.");
    assert.equal(voteNoTotals, "0", "Fail to add votes no.");
    assert.equal(openStatus, "open", "Fail to stay open.");
    assert.equal(
      mergeStatus,
      "merge",
      "Fail to merge even though it was voted in."
    );
  });
});
