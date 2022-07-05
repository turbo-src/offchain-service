import Repo from "../db/Models/Repo.js";
export default async function createRepo(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor,
  /*side:*/ side
) {
  try {
    let owner = repo_id.split("/")[0];
    await Repo.create({ owner: owner, repo_id: repo_id });
  } catch (error) {
    console.log(error);
  }
}
