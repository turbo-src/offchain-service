const assert = require("assert");
const { postGetMostRecentLinkedPullRequest } = require("../src/requests");

describe("getMostRecentLinkedPullRequest", function () {
  it("should get most recent linked pull request", async function () {
    const pullRequestUpdates = await postGetMostRecentLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.deepEqual(
      pullRequestUpdates,
     { status: 200, state: "new", repo_id: "joseph/demo",  fork_branch: "pullRequest9c", "childDefaultHash": "defaultHash9c", "defaultHash": "defaultHash9c" },
      "Fail to stay open."
    );
  });
});
