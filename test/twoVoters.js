import assert from "assert";
import createRepo from "../lib/createRepo.js";
import getContributorTokenAmount from "../lib/getContributorTokenAmount.js";
import createUser from "../lib/createUser.js";
import transferTokens from "../lib/transferTokens.js";
import getVoteNoTotals from "../lib/state/getVoteNoTotals.js";
import getVoteYesTotals from "../lib/state/getVoteYesTotals.js";
import getVoteTotals from "../lib/state/getVoteTotals.js";
import createPullRequest from "../lib/createPullRequest.js";
import setVote from "../lib/setVote.js";
import getVoteStatus from "../lib/state/getVoteStatus.js";

describe("Two voters vote - exceed quorum.", function () {
  it("Should add votes to the votes table and add yes/no votes to the pullrequest table", async function () {
    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "1431",
      /*contributor_name:*/ "dominic",
      /*contributor_signature:*/ "132425"
    );

    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "1432",
      /*contributor_name:*/ "am",
      /*contributor_signature:*/ "264262625"
    );

    await createUser(
      /*owner:*/ "",
      /*repo:*/ "",
      /*contributor_id:*/ "1113",
      /*contributor_name:*/ "joan",
      /*contributor_signature:*/ "13132324141"
    );

    await createRepo("dominic", "dominic/demo", "", "1431", "");

    await createPullRequest(
      /*owner:*/ "dominic",
      /*repo_id:*/ "dominic/demo",
      /*fork_branch:*/ "pullRequest1",
      /*pr_id:*/ "issue_1",
      /*title:*/ "refactor(lsp): remove redundant client cleanup"
    );

    await transferTokens(
      /*owner*/ "dominic",
      /*repo_id*/ "dominic/demo",
      /*from*/ "1431",
      /*to*/ "1432",
      /*amount*/ "160000"
    );

    await transferTokens(
      /*owner*/ "dominic",
      /*repo_id*/ "dominic/demo",
      /*from*/ "1431",
      /*to*/ "1113",
      /*amount*/ "660000"
    );

    let daveVote = await setVote(
      /*owner:*/ "dominic",
      /*repo:*/ "dominic/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "1431",
      /*side:*/ "yes"
    );

    let amVote = await setVote(
      /*owner:*/ "dominic",
      /*repo:*/ "dominic/demo",
      /*pr_id:*/ "issue_1",
      /*contributor_id:*/ "1432",
      /*side:*/ "yes"
    );

    const voteYesTotals = await getVoteYesTotals(
      /*owner:*/ "dominic",
      /*repo:*/ "dominic/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "1453",
      /*side:*/ ""
    );

    // const voteNoTotals = await getVoteNoTotals(
    //   /*owner:*/ "dominic",
    //   /*repo:*/ "dominic/demo",
    //   /*pr_id:*/ "issue_1",
    //   /*contributor_id:*/ "1113",
    //   /*side:*/ ""
    // );

    // const voteTotals = await getVoteTotals(
    //   /*owner:*/ "dominic",
    //   /*repo:*/ "dominic/demo",
    //   /*pr_id:*/ "issue_1",
    //   /*contributor:*/ "1453",
    //   /*side:*/ ""
    // );

    // const openStatus = await getVoteStatus(
    //   /*owner:*/ "dominic",
    //   /*repo:*/ "dominic/demo",
    //   /*pr_id:*/ "issue_1",
    //   /*contributor:*/ "1453",
    //   /*side:*/ ""
    // );

    // let joanVote = await setVote(
    //   /*owner:*/ "dominic",
    //   /*repo:*/ "dominic/demo",
    //   /*pr_id:*/ "issue_1",
    //   /*contributor_id:*/ "1113",
    //   /*side:*/ "yes"
    // );

    // const mergeStatus = await getVoteStatus(
    //   /*owner:*/ "dominic",
    //   /*repo:*/ "dominic/demo",
    //   /*pr_id:*/ "issue_1",
    //   /*contributor_id:*/ "1432",
    //   /*side:*/ ""
    // );

    assert.equal(daveVote, 204, "Fail to add vote to database");
    assert.equal(amVote, 204, "Fail to add vote to database");
    // assert.equal(joanVote, 204, "Fail to add vote to database");
    assert.equal(voteYesTotals, "340000", "Fail to add votes yes.");
    // assert.equal(voteNoTotals, "0", "Fail to add votes no.");
    // assert.equal(voteTotals, "0.34", "Fail to add votes no.");
    // assert.equal(openStatus, "open", "Fail to stay open.");
    // assert.equal(
    //   mergeStatus,
    //   "merge",
    //   "Fail to merge even though it was voted in."
    // );
  });
});
