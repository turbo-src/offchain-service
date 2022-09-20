const assert = require("assert");
const { postGetPRvoteStatus } = require("../src/requests");

describe("getPRvoteStatus", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    const openStatus = await postGetPRvoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    assert.deepEqual(
      openStatus,
     { status: 200, state: "merge", repo_id: "joseph/demo",  fork_branch: "pullRequest1", "childDefaultHash": "defaultHash", "defaultHash": "defaultHash" },
      "Fail to stay open."
    );
    //assert.deepEqual(
    //  prStatusNotFound,
    //  { state: 200, exists: false },
    //  "This repo should return 404 as it has not been created"
    //);
  });
});
