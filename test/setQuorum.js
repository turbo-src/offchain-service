const assert = require("assert");
const { setQuorum } = require("../lib");

describe("setQuorum", function () {
  it("should set the quorum for a repo", async function () {
    let res = await setQuorum(/*repo_id:*/ "joseph/demo", /*quorum*/ ".5");

    assert.equal(res, "204", "Failed to set repo quorum");
  });
});
