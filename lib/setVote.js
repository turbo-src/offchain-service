const { Repo, PullRequest, Vote } = require('../server/db')
const getVotePowerAmount = require('./getVotePowerAmount')
const updatePullRequest = require('./updatePullRequest')

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

  // Possible return values and their meanings:
  // - '201': Vote successfully created.
  // - '403': Forbidden. Possible reasons:
  //   - The pull request is not mergeable.
  //   - The contributor doesn't have sufficient voting power.
  //   - The pull request is not in a voteable state (e.g., closed or merged).
  //   - The contributor has already voted on this pull request.
  // - '404': Pull request not found.
  // - '500': Internal server error.

  return '201';
}

module.exports = setVote
