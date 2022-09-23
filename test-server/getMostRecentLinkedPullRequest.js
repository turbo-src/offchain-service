const assert = require("assert");
const { postGetMostRecentLinkedPullRequest } = require("../src/requests");

describe("getMostRecentLinkedPullRequest", function () {
  it("should get most recent linked pull request", async function () {
    const pullRequest = await postGetMostRecentLinkedPullRequest(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash9",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    assert.deepEqual(
      pullRequest,
     { status: 200, state: "open", repo_id: "joseph/demo",  fork_branch: "pullRequest9", "childDefaultHash": "defaultHash9c", "defaultHash": "defaultHash9c" },
      "Fail to stay open."
    );
  });
});
