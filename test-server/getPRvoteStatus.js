const assert = require("assert");
const { postGetPRvoteStatus } = require("../src/requests");

describe("getPRvoteStatus", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    let prStatus = await postGetPRvoteStatus(
	    "",
	    "joseph/demo",
	    "pullRequest1",
	    "",
	    ""
    );
    //let prStatusNotFound = await getPRvoteStatus("jeffrey/demo42", "issue_1");
    assert.deepEqual(
      prStatus,
      {
        state: 200,
	type: 2
      },
      "Failed to find a tokenized repo"
    );
    //assert.deepEqual(
    //  prStatusNotFound,
    //  { state: 200, exists: false },
    //  "This repo should return 404 as it has not been created"
    //);
  });
});
