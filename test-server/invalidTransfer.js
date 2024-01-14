const assert = require('assert');
const { postTransferTokens } = require('../src/requests');

let snooze_ms = 5000;

describe('Invalid transfers should return 403, valid should return 201', function () {
  this.timeout(snooze_ms * 12);
  it('Should return 403 when a user tries to transfer tokens when they do not have them or if they try to transfer in excess of their balance.', async function () {
    const ignaciusTransfer = await postTransferTokens(
      /*owner*/ 'joseph',
      /*repo_id*/ 'joseph/demo',
      /*from*/ '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      /*to*/ '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
      /*amount*/ '1',
    );

    const thibautTransfer = await postTransferTokens(
      /*owner*/ 'joseph',
      /*repo_id*/ 'joseph/demo',
      /*from*/ '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
      /*to*/ '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      /*amount*/ '50001',
    );

    const thibautTransferSuccess = await postTransferTokens(
      /*owner*/ 'joseph',
      /*repo_id*/ 'joseph/demo',
      /*from*/ '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
      /*to*/ '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      /*amount*/ '50',
    );

    const ignaciusTransferSuccess = await postTransferTokens(
      /*owner*/ 'joseph',
      /*repo_id*/ 'joseph/demo',
      /*from*/ '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      /*to*/ '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
      /*amount*/ '25',
    );

    assert.deepEqual(ignaciusTransfer, {
      amount: 1,
      createdAt: '',
      from: '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      id: '',
      network: 'Turbosrc',
      repo: 'joseph/demo',
      status: 403,
      to: '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
    });
    assert.deepEqual(
      thibautTransfer,
      {
        amount: 50_001,
        createdAt: '',
        from: '0x0c587fB3EBA5e824Df543bDE5d972Fd9F7cFC164',
        id: '',
        network: 'Turbosrc',
        repo: 'joseph/demo',
        status: 403,
        to: '0x0c16EFDc6e6490fd6066AB794Dc841A50eB5C90C',
      },
      'failed to prevent invalid token transfer.',
    );

    assert.deepEqual(thibautTransferSuccess.amount, 50);
    assert.deepEqual(thibautTransferSuccess.status, 201);

    assert.deepEqual(ignaciusTransferSuccess.amount, 25);
    assert.deepEqual(ignaciusTransferSuccess.status, 201);
  });
});
