const assert = require("assert");
const { postGetRepoStatus } = require("../src/requests");

describe("postGetRepoStatus", function () {
  it("should return 200 if a repo has been tokenized", async function () {
    let repoStatus = await postGetRepoStatus("joseph/demo");
    let repoStatusNotFound = await postGetRepoStatus("jeffrey/demo42");
    assert.deepEqual(
      repoStatus,
      { code: 200, result: true },
      "Failed to find a tokenized repo"
    );
    assert.deepEqual(
      repoStatusNotFound,
      { code: 200, result: false },
      "This repo should return 404 as it has not been created"
    );
  });
});
