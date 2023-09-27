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
      /*title:*/ "refactor: deploy with nix",
      /*issue_id:*/ "issue_1"
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
      /*title:*/ "insert column FAVORITE_COLOR on table CONTRIBUTORS",
      /*issue_id:*/ "issue_2"
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
      /*title:*/ "declare as type: module",
      /*issue_id:*/ "issue_3"
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
      /*title:*/ "implement feature: read receipt",
      /*issue_id:*/ "issue_4"
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
      /*title:*/ "fix: prevent vote if not new or open",
      /*issue_id:*/ "issue_5"
      );

      const issue_6 = await postCreatePullRequest(
        /*owner:*/ "joseph",
        /*repo_id:*/ "joseph/demo",
        /*defaultHash:*/ "defaultHash6",
        /*childDefaultHash:*/ "defaultHash6",
        /*head:*/ "head",
        /*branchDefaultHash*/ "branchDefaultHash",
        /*remoteURL*/ "remoteURL",
        /*baseBranch:*/ "master",
        /*fork_branch:*/ "pullRequest6",
        /*title:*/ "fix: prevent vote if not new or open",
        /*issue_id:*/ "issue_6"
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
      /*title:*/ "fix: prevent vote if not new or open",
      /*issue_id:*/ "issue_7"
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
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_8"
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
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_9"
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
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_10"
      );

    const issue_11 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash11",
      /*childDefaultHash:*/ "defaultHash11",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest11",
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_11"
      );

    const issue_12 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash12",
      /*childDefaultHash:*/ "defaultHash12",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest12",
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_12"
      );

    const issue_13 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash13",
      /*childDefaultHash:*/ "defaultHash13",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest13",
      /*title:*/ "feat:prevent vote when PR in conflict.",
      /*issue_id:*/ "issue_13"
      );

    const issue_14 = await postCreatePullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash14",
      /*childDefaultHash:*/ "defaultHash14",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest14",
      /*title:*/ "feat: create a pull request.",
      /*issue_id:*/ "issue_14"
      );

    const issue_15 = await postCreatePullRequest(
      /*owner:*/ "michael",
      /*repo_id:*/ "michael/demo",
      /*defaultHash:*/ "defaultHash15",
      /*childDefaultHash:*/ "defaultHash15",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest15",
      /*title:*/ "feat: create a pull request.",
      /*issue_id:*/ "issue_15"
      );

    const issue_16 = await postCreatePullRequest(
      /*owner:*/ "michael",
      /*repo_id:*/ "michael/demo",
      /*defaultHash:*/ "defaultHash15",
      /*childDefaultHash:*/ "defaultHash15",
      /*head:*/ "head",
      /*branchDefaultHash*/ "branchDefaultHash",
      /*remoteURL*/ "remoteURL",
      /*baseBranch:*/ "master",
      /*fork_branch:*/ "pullRequest15",
      /*title:*/ "feat: create a pull request.",
      /*issue_id:*/ "issue_16"
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
      issue_9,
      "201",
      "Failed to create a pull request issue_9 in the database"
    );
    assert.equal(
      issue_10,
      "201",
      "Failed to create a pull request issue_10 in the database"
    );
    assert.equal(
      issue_11,
      "201",
      "Failed to create a pull request issue_11 in the database"
    );
    assert.equal(
      issue_12,
      "201",
      "Failed to create a pull request issue_12 in the database"
    );
    assert.equal(
      issue_13,
      "201",
      "Failed to create a pull request issue_13 in the database"
    );
    assert.equal(
      issue_14,
      "201",
      "Failed to create a pull request issue_14 in the database"
    );
    assert.equal(
      issue_15,
      "201",
      "You should be able to create a pull request which has the same default hash as another PR in an unrelated repo. Default hashes are only unique to repos, not globally."
    );
    assert.equal(
      issue_16,
      "403",
      "You should not be able to create a pull request which has the same default hash as another PR in the same repo."
    );
  });
});
