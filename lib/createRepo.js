const { Repo } = require('../server/db')

async function createRepo(
    /*repo id:*/ repo_id,
    /*contributor:*/ contributor_id,
    /*repo name:*/ repo_name,
) {
    try {
        await Repo.create({
            repo_id: repo_id,
            contributor_id: contributor_id,
            repo_name: repo_name,
        })
        console.log(`created repo ${repo_id} successfully!`)
        return 201
    } catch (error) {
        console.log(error)
        return 403
    }
}

module.exports = createRepo
