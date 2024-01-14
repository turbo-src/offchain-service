const { PullRequest } = require('../../server/db')
async function getPRvoteNoTotals(
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
        return pullRequest.noTokenAmount
    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = getPRvoteNoTotals
