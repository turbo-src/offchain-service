const getPullRequest = require('./getPullRequest')

async function getMostRecentLinkedPullRequest(
    owner,
    repo_id,
    defaultHash,
    contributor_id,
    side,
) {
    try {
        let pr = await getPullRequest(
            owner,
            repo_id,
            defaultHash,
            contributor_id,
            side,
        )

        while (pr.defaultHash !== pr.childDefaultHash) {
            let prChild = await getPullRequest(
                owner,
                repo_id,
                pr.childDefaultHash,
                contributor_id,
                side,
            )

            if (prChild.status === 200) {
                pr = prChild
            } else {
                return pr
            }
        }

        return pr
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            state: '',
            repo_id: repo_id,
            fork_branch: '',
            defaultHash: '',
            childDefaultHash: '',
            head: '',
            branchDefaultHash: '',
            remoteURL: '',
            baseBranch: '',
        }
    }
}

module.exports = getMostRecentLinkedPullRequest
