const assert = require("assert");
const { postCreatePullRequest } = require("../src/requests");

describe("postCreatePullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    this.timeout(4000);
    const issue_1 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash1",
      /*childDefaultHash:*/ "defaultHash1",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest1",
      /*title:*/ "refactor: deploy with nix"
    );

    const issue_2 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash2",
      /*childDefaultHash:*/ "defaultHash2",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest2",
      /*title:*/ "insert column FAVORITE_COLOR on table CONTRIBUTORS"
    );

    const issue_3 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash3",
      /*childDefaultHash:*/ "defaultHash3",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest3",
      /*title:*/ "declare as type: module"
    );

    const issue_4 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash4",
      /*childDefaultHash:*/ "defaultHash4",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest4",
      /*title:*/ "implement feature: read receipt"
    );

    const issue_5 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash5",
      /*childDefaultHash:*/ "defaultHash5",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest5",
      /*title:*/ "fix: prevent vote if not new or open"
    );

    const issue_7 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash7",
      /*childDefaultHash:*/ "defaultHash7",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest7",
      /*title:*/ "fix: prevent vote if not new or open"
    );

    const issue_8 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8",
      /*childDefaultHash:*/ "defaultHash8",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest8",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_8b = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8b",
      /*childDefaultHash:*/ "defaultHash8b",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest8b",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_8c = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash8c",
      /*childDefaultHash:*/ "defaultHash8c",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest8c",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_9 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*childDefaultHash:*/ "defaultHash9",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest9",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_9b = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9b",
      /*childDefaultHash:*/ "defaultHash9b",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest9b",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_9c = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9c",
      /*childDefaultHash:*/ "defaultHash9c",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest9c",
      /*title:*/ "feat:prevent vote when PR in conflict."
    );

    const issue_10 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create a pull request."
    );

    const issue_11 = await postCreatePullRequest(
      /*owner:*/ "michael",
      /*repo_id:*/ "michael/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create a pull request."
    );

    const issue_12 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash10",
      /*childDefaultHash:*/ "defaultHash10",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest10",
      /*title:*/ "feat: create a pull request."
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
      "Failed to create a pull request issue_5 in the database"
    );
    assert.equal(
      issue_7,
      "201",
      "Failed to create a pull request issue_7 in the database"
    );
    assert.equal(
      issue_8,
      "201",
      "Failed to create a pull request issue_8 in the database"
    );
    assert.equal(
      issue_8b,
      "201",
      "Failed to create a pull request issue_8b in the database"
    );
    assert.equal(
      issue_8c,
      "201",
      "Failed to create a pull request issue_8c in the database"
    );
    assert.equal(
      issue_9,
      "201",
      "Failed to create a pull request issue_9 in the database"
    );
    assert.equal(
      issue_9b,
      "201",
      "Failed to create a pull request issue_9b in the database"
    );
    assert.equal(
      issue_9c,
      "201",
      "Failed to create a pull request issue_9c in the database"
    );
    assert.equal(
      issue_10,
      "201",
      "Failed to create a pull request issue_9c in the database"
    );
    assert.equal(
      issue_11,
      "201",
      "You should be able to create a pull request which has the same default hash as another PR in an unrelated repo. Default hashes are only unique to repos, not globally."
    );
    assert.equal(
      issue_12,
      "403",
      "You should not be able to create a pull request which has the same default hash as another PR in the same repo."
    );
  });
});
