const assert = require("assert");
const { getContributorTokenAmount, transferTokens } = require("../lib");

describe("transferTokens", function () {
  it("should transfer tokens between two contributors", async function () {
    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*amount*/ "500001"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c3B10A0B8bC506833A1CD54672a3b67502d7a53",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0ceeed31E39a896CB5f69f1a05c013a7840A5f78",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0cea312808EdcdC905428D3922480930689F4500",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*amount*/ "50000"
    );

    await transferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164",
      /*amount*/ "50000"
    );

    let maryTokenAmount = await getContributorTokenAmount(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cc59907e45614540dAa22Cf62520306439360f2",
      /*side:*/ ""
    );

    let tokenAmount = Number(maryTokenAmount);

    assert.equal(
      tokenAmount,
      5_00_001,
      "Failed to transfer tokens between two contributors"
    );
  });
});
