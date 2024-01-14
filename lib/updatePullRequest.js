const { PullRequest, Repo } = require('../server/db')

async function updatePullRequest(
    /*repo_id:*/ repo_id,
    /*defaultHash:*/ defaultHash,
    /*childDefaultHash:*/ childDefaultHash,
    /*mergeable:*/ mergeable,
) {
    try {
        let pullRequest = await PullRequest.findOne({
            where: { defaultHash: defaultHash, repo_id: repo_id },
        })
        await pullRequest.update({ childDefaultHash: childDefaultHash })
        if (mergeable !== pullRequest.mergeable) {
            await pullRequest.update({ mergeable: mergeable })
        }
        return 201
    } catch (error) {
        console.log(error)
        return 500
    }
}
module.exports = updatePullRequest
