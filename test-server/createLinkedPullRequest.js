const assert = require("assert");
const {
  postSetVote,
  postGetMostRecentLinkedPullRequest,
  postGetPRvoteYesTotals,
  postGetPRvoteNoTotals,
  createLinkedPullRequest,
  getRepoData,
  getVotes,
} = require("../src/requests");

var snooze_ms = 1500;
const snooze = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("createLinkedPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    this.timeout(4000);
    // Vote on original
    let michaelVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ "yes"
    );

    let gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side*/ "yes"
    );
    const issue_10b = await createLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*parentDefaultHash:*/ "defaultHash10",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create linked pull request."
    );

    await snooze(snooze_ms);

    let magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*childDefaultHash:*/ "defaultHash10b",
      /*mergeable:*/ true,
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side*/ "yes"
    );

    const pullRequestLatest = await postGetMostRecentLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10b",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    const prData = await getVotes(
      "joseph/demo",
      "defaultHash10b",
      "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925"
    );

    assert.equal(
      prData.voteData.voteTotals.totalVotes,
      150_000,
      "Fail to rollover votes to linked pull request."
    );

    assert.equal(
      issue_10b,
      "201",
      "Failed to create a pull request issue_10 with defaultHash10b in the database"
    );
    assert.deepEqual(
      pullRequestLatest,
      {
        status: 200,
        state: "open",
        repo_id: "joseph/demo",
        fork_branch: "pullRequest10",
        childDefaultHash: "defaultHash10b",
        defaultHash: "defaultHash10b",
        head: "head",
        branchDefaultHash: "branchDefaultHash",
        remoteURL: "remoteURL",
        baseBranch: "master",
      },
      "Fail to stay open."
    );
  });
});
