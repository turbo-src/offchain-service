const assert = require("assert");
const { getQuorum } = require("../lib");

describe("getQuorum", function () {
  it("should return the quorum of a repo", async function () {
    let res = await getQuorum(/*repo_id:*/ "joseph/demo");

    let quorum = Number(res);

    assert.equal(quorum, 0.34, "Failed to get repo quorum");
  });
});
