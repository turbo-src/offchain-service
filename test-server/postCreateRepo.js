const assert = require("assert");
const { postCreateRepo } = require("../src/requests");

describe("postCreateRepo", function () {
  it("should create a repo and return a status code of 201", async function () {
    const repo = await postCreateRepo(
      "joseph",
      "joseph/demo",
      "",
      "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      ""
    );

    const repo1 = await postCreateRepo(
      "michael",
      "michael/demo",
      "",
      "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      ""
    );

    assert.equal(repo, "201", "Failed to create a repo in the database");
    assert.equal(repo1, "201", "Failed to create a repo in the database");
  });
});
