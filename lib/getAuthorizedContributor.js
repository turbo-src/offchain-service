const getVotePowerAmount = require('./getVotePowerAmount')

async function getAuthorizedContributor(
    /*contributor_id:*/ contributor_id,
    /*repo_id:*/ repo_id,
) {
    let tokens = await getVotePowerAmount('', repo_id, '', contributor_id, '')
    if (tokens.amount >= 1) {
        return true
    } else {
        return false
    }
}

module.exports = getAuthorizedContributor
