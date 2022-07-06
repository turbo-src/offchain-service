import Repo from "../db/Models/Repo.js";
export default async function createRepo(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor,
  /*side:*/ side
) {
  try {
    await Repo.create({ owner: owner, repo_id: repo_id });
  } catch (error) {
    console.log(error);
  }
}
