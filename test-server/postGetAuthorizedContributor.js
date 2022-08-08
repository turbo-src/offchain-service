const assert = require("assert");
const { postGetAuthorizedContributor } = require("../src/requests");

describe("postGetAuthorizedContributor", function () {
  it("should return true if a user is an authorized contributor to a repo, ie, has tokens, else false", async function () {
    let isAuthorizedContributor = await postGetAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*side:*/ ""
    );

    let isNotAuthorizedContributor = await postGetAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0c9SFI9GWD22ERD0IFFFAD0IkFEFEFEW33RQR0I",
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
