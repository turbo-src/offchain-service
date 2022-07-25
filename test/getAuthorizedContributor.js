import assert from "assert";
import createRepo from "../lib/createRepo.js";
import createUser from "../lib/createUser.js";
import getAuthorizedContributor from "../lib/getAuthorizedContributor.js";

describe("getAuthorizedContributor", function () {
  it("should return true if a user is an authorized contributor to a repo, ie, has tokens, else false", async function () {
    await createRepo("boniface", "boniface/demo", "", "131", "");

    let isAuthorizedContributor = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "boniface/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "131",
      /*side:*/ ""
    );

    let isNotAuthorizedContributor = await getAuthorizedContributor(
      /*owner:*/ "",
      /*repo:*/ "boniface/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "414",
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
