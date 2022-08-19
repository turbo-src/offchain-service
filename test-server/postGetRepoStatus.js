const assert = require("assert");
const { postGetRepoStatus } = require("../src/requests");

describe("postGetRepoStatus", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    let repoStatus = await postGetRepoStatus("joseph/demo");
    // let repoStatusNotFound = await postGetRepoStatus("jeffrey/demo42");
    assert.equal(repoStatus, 200, "Failed to find a tokenized repo");
    // assert.equal(
    //   repoStatusNotFound,
    //   404,
    //   "This repo should return 404 as it has not been created"
    // );
  });
});
