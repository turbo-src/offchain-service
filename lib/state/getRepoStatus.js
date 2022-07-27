import { Repo } from "../../db/index.js";
export default async function getVoteNoTotals(
  /*owner:*/ owner,
  /*repo:*/ repo_id,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    await Repo.findOne({ where: { repo_id: repo_id } });
    return 200;
  } catch (error) {
    console.log(error);
    return 404;
  }
}
