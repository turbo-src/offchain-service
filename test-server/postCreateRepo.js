const assert = require("assert");
const { postCreateRepo } = require("../src/requests");

describe("postCreateRepo", function () {
  it("should create a repo and return a status code of 201", async function () {
    const res = await postCreateRepo(
      "joseph",
      "joseph/demo",
      "",
      "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      ""
    );

    assert.equal(res, "201", "Failed to create a repo in the database");
  });
});
