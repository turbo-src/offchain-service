const assert = require("assert");
const { postCreatePullRequest } = require("../src/requests");

describe("postCreatePullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    const issue_1 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash1",
      /*childDefaultHash:*/ "defaultHash1",
      /*fork_branch:*/ "pullRequest1",
      /*title:*/ "refactor: deploy with nix"
    );

    const issue_2 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*childDefaultHash:*/ "defaultHash2",
      /*fork_branch:*/ "pullRequest2",
      /*title:*/ "insert column FAVORITE_COLOR on table CONTRIBUTORS"
    );

    const issue_3 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*fork_branch:*/ "pullRequest3",
      /*title:*/ "declare as type: module"
    );

    const issue_4 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash4",
      /*childDefaultHash:*/ "defaultHash4",
      /*fork_branch:*/ "pullRequest4",
      /*title:*/ "implement feature: read receipt"
    );

    const issue_5 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*childDefaultHash:*/ "defaultHash5",
      /*fork_branch:*/ "pullRequest5",
      /*title:*/ "fix: prevent vote if not new or open"
    );

    assert.equal(
      issue_1,
      "201",
      "Failed to create a pull request issue_1 in the database"
    );
    assert.equal(
      issue_2,
      "201",
      "Failed to create a pull request issue_2 in the database"
    );
    assert.equal(
      issue_3,
      "201",
      "Failed to create a pull request issue_3 in the database"
    );
    assert.equal(
      issue_4,
      "201",
      "Failed to create a pull request issue_4 in the database"
    );
    assert.equal(
      issue_5,
      "201",
      "Failed to create a pull request issue_4 in the database"
    );
  });
});
