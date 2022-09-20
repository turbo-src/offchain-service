const assert = require("assert");
const { updatePullRequest, postGetPRvoteStatus } = require("../src/requests");

describe("update pull request", function () {
  it("should return 201 if pull request is updated", async function () {
    const openStatus = await postGetPRvoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash1",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    const updateRes = await updatePullRequest(
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash1",
      /*childDefaultHash:*/ "ab3fc"
    );
    const updateStatus = await postGetPRvoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*defaultHash:*/ "defaultHash1",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    assert.equal(
	updateRes,
	201,
	"fail to update pull request child defaultHash"
    );
    assert.deepEqual(
      openStatus,
     { status: 200, state: "merge", repo_id: "joseph/demo",  fork_branch: "pullRequest1", "childDefaultHash": "defaultHash", "defaultHash": "defaultHash" },
      "Fail to stay open."
    );
    assert.deepEqual(
      updateStatus,
     { status: 200, state: "merge", repo_id: "joseph/demo",  fork_branch: "pullRequest1", "childDefaultHash": "defaultHash", "defaultHash": "ab3fc" },
      "Fail to stay open."
    ); //assert.deepEqual( prStatusNotFound,
    //  { state: 200, exists: false },
    //  "This repo should return 404 as it has not been created"
    //);
  });
});
