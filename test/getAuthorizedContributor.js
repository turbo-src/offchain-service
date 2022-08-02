const assert = require("assert");
const { getAuthorizedContributor } = require("../lib");

describe("getAuthorizedContributor", function () {
  it("should return true if a user is an authorized contributor to a repo, ie, has tokens, else false", async function () {
    let isAuthorizedContributor = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "boniface/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ ""
    );

    let isNotAuthorizedContributor = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a42743F3FG92D03301858",
      /*side:*/ ""
    );

    assert.equal(
      isAuthorizedContributor,
      true,
      "Failed to verify authorized contributor. Contributor IS authorized."
    );

    assert.equal(
      isNotAuthorizedContributor,
      false,
      "Failed to verify authorized contributor. Contributor IS NOT authorized."
    );
  });
});
