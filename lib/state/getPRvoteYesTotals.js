const { Repo, Vote, PullRequest } = require('../../server/db')
async function getPRvoteYesTotals(
    /*owner:*/ owner,
    /*repo:*/ repo_id,
    /*defaultHash:*/ defaultHash,
    /*contributor:*/ contributor_id,
    /*side:*/ side,
) {
    try {
        let pullRequest = await PullRequest.findOne({
            where: { defaultHash: defaultHash, repo_id: repo_id },
        })
        return pullRequest.yesTokenAmount
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = getPRvoteYesTotals
