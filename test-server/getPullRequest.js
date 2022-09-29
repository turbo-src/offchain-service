const assert = require("assert");
const { getPullRequest } = require("../src/requests");

describe("getPullRequest", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    let prStatus = await getPullRequest("joseph/demo", "issue_1");
    let prStatusNotFound = await getPullRequest("jeffrey/demo42", 
"issue_2");
    assert.deepEqual(
      prStatus,
      { status: 200, exists: true },

    return {
      status: 200,
      defaultHash: pr.defaultHash,
      title: pr.title,
      repo_id: pr.repo_id,
      state: pr.state,
      defaultHash: pr.defaultHash,
      childDefaultHash: pr.childDefaultHash,
      head: pr.head,
      branchDefaultHash: pr.branchDefaultHash,
      remoteURL: pr.remoteURL,
      baseBranch: pr.baseBranch
    }
      "Failed to get pull request"
    );
    assert.deepEqual(
      prStatusNotFound,
      { status: 200, exists: false },
      "This should return a 500"
    );
  });
});
