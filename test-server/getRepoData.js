const assert = require("assert");
const { getRepoData } = require("../src/requests");

describe("getRepoData", function () {
  it("should return an object of data about the repo", async function () {
    let repoData = await getRepoData("joseph/demo", "0x0c55D3B26A1229B9D707a4272F55E66103301858");
    // let repoDataNotFound = await getRepoData("jeffrey/demo42");
    assert.deepEqual(
      repoData.status,
      200,
      "Failed to find a repo's data"
    );
    // assert.deepEqual(
    //   repoDataNotFound.status,
    //   500,
    //   "This repo should 500 if there was an error"
    // );
  });
});
