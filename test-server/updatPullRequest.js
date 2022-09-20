const assert = require("assert");
const { updatePullRequest, postGetPRvoteStatus } = require("../src/requests");

describe("getPRvoteStatus", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    const openStatus = await postGetPRvoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*contributor:*/ "",
      /*side:*/ ""
    );
    const updateRes = await updatePullRequest(
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
      /*childDefaultHash:*/ "ab3fc"
    );
    const updateStatus = await postGetPRvoteStatus(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "issue_1",
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
