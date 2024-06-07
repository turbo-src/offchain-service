const { Repo, PullRequest, Vote } = require('../server/db');
const getVotePowerAmount = require('./getVotePowerAmount');
const updatePullRequest = require('./updatePullRequest');
const algosdk = require('algosdk');

async function setVote(
  /*repoID:*/ repoID,
  /*url:*/ url,
  /*commitID:*/ commitID,
  /*contributorID:*/ contributorID,
  /*signature:*/ signature,
) {
  console.log('setVote arguments:', {
    repoID,
    url,
    commitID,
    contributorID,
    signature,
  });

  console.log('signed txn:', signature);
  console.log('Type of signedTxn:', typeof signature);

  // Possible return values and their meanings:
  // - '201': Vote successfully created.
  // - '403': Forbidden. Possible reasons:
  //   - The pull request is not mergeable.
  //   - The contributor doesn't have sufficient voting power.
  //   - The pull request is not in a voteable state (e.g., closed or merged).
  //   - The contributor has already voted on this pull request.
  // - '404': Pull request not found.
  // - '500': Internal server error.

  const algodServer = process.env.ALGOD_SERVER;
  const algodPort = process.env.ALGOD_PORT;
  const algodToken = process.env.ALGOD_TOKEN;

  console.log('Algorand client settings:', {
    algodServer,
    algodPort,
    algodToken,
  });

  try {
    let client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    const { default: fetch } = await import('node-fetch');
    global.fetch = fetch;

    console.log('Decoding signed transaction...');
    const signedTxnBuffer = Buffer.from(signature, 'base64');
    const decodedTxn = algosdk.decodeSignedTransaction(signedTxnBuffer);
    console.log('Decoded transaction:', decodedTxn);

    console.log('Sending raw transaction...');
    const txBytes = Buffer.from(signature, 'base64');
    let sendResponse;
    try {
      sendResponse = await client.sendRawTransaction(txBytes).do();
      console.log('Transaction sent!', sendResponse);
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }

    let confirmedTxn = await algosdk.waitForConfirmation(client, sendResponse.txId, 4);
    console.log('Transaction confirmed:', confirmedTxn);

    // Perform additional logic based on the confirmed transaction, if needed

    return '201';
  } catch (error) {
    console.log('Error sending transaction:', error);
    return '500';
  }
}

module.exports = setVote;
