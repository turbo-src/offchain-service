const { PullRequest } = require('../server/db')

async function getPullRequest(
    /*owner:*/ owner,
    /*repo:*/ repo_id,
    /*defaultHash:*/ defaultHash,
    /*contributor:*/ contributor_id,
    /*side:*/ side,
) {
    try {
        let pr = await PullRequest.findOne({
            where: { repo_id: repo_id, defaultHash: defaultHash },
        })
        if (pr !== null) {
            console.log('getPullRequest ' + pr.state)
            console.log('defaultHash ' + pr.defaultHash)
            console.log('childDefaultHash ' + pr.childDefaultHash)
            return {
                status: 200,
                state: pr.state,
                repo_id: pr.repo_id,
                basebranch: pr.baseBranch,
                fork_branch: pr.fork_branch,
                defaultHash: pr.defaultHash,
                childDefaultHash: pr.childDefaultHash,
                head: pr.head,
                branchDefaultHash: pr.branchDefaultHash,
                remoteURL: pr.remoteURL,
                baseBranch: pr.baseBranch,
            }
        } else {
            return {
                status: 404,
                state: '',
                repo_id: repo_id,
                baseBranch: '',
                fork_branch: '',
                defaultHash: defaultHash,
                childDefaultHash: '',
                head: '',
                branchDefaultHash: '',
                remoteURL: '',
                baseBranch: '',
            }
        }
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
module.exports = getPullRequest
