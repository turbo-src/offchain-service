const assert = require("assert");
const { createLinkedPullRequest } = require("../src/requests");

describe("createLinkedPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    this.timeout(4000);
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

    assert.equal(
      issue_10b,
      "201",
      "Failed to create a pull request issue_10 in the database"
    );
  });
});
