const { Repo, PullRequest, Vote } = require("../server/db");
const getVotePowerAmount = require("./getVotePowerAmount");
const updatePullRequest = require("./updatePullRequest");

async function setVote(
	/*owner:*/ owner,
	/*repo:*/ repo_id,
	/*defaultHash:*/ defaultHash,
	/*childDefaultHash:*/ childDefaultHash,
	/*mergeable:*/ mergeable,
	/*contributor_id:*/ contributor_id,
	/*side:*/ side
) {
	try {
		if (!mergeable) {
			return 403;
		}
		// Ensure token.status returns a 200
		// and token.amount > 0.
		let data = await Repo.findOne({
			where: { repo_id: repo_id },
			include: {
				model: PullRequest,
				include: {
					model: Vote,
				},
			},
		});
		const json = JSON.stringify(data, 2, null);
		const repo = JSON.parse(json);
		const pullRequests = repo.pullrequests;
		let curPullRequest = pullRequests.find(
			(pr) => pr.defaultHash === defaultHash
		);

		if (!curPullRequest) {
			console.log("pull request doesn't exist");
			return 404; //Not found
		}

		if (defaultHash !== childDefaultHash) {
			// Update of merge hash and mergeable state.
			const upRes = await updatePullRequest(
				repo_id,
				defaultHash,
				childDefaultHash,
				mergeable
			);
			if (upRes === 201) {
				// get new instance of pull request after above update so votes are added at its defaultHash state
				curPullRequest = await PullRequest.findOne({
					where: { defaultHash: defaultHash, repo_id: repo_id },
				});
			} else {
				return 403; // Appropriate status code?
			}
		}

		// Only vote on new or open pull requests.
		const voteable =
			curPullRequest.state === "open" ||
			curPullRequest.state === "pre-open" ||
			curPullRequest.state === "vote";
		if (!voteable) {
			return 403; // Appropriate status code?
		}

		const votes = curPullRequest.votes;
		const duplicateVote = votes.some(
			(vote) => vote.contributor_id === contributor_id
		);

		if (duplicateVote) {
			console.log("duplicate");
			return 403;
		} else {
			let tokens = await getVotePowerAmount(
				/*owner:*/ "",
				/*repo:*/ repo_id,
				/*defaultHash:*/ defaultHash,
				/*contributor_id:*/ contributor_id,
				/*side:*/ ""
			);

			// Should also check if tokens.status === 404
			if (tokens.amount < 1) {
				return 403;
			}

			let vote = await Vote.create({
				contributor_id: contributor_id,
				defaultHash: defaultHash,
				votePower: tokens.amount,
				side: side,
			});

			await vote.setPullrequest(curPullRequest.id);

			if (side === "yes") {
				let newTotal = pullRequest.yesTokenAmount + tokens.amount;
				await curPullRequest.update({
					yesTokenAmount: newTotal,
					where: { id: curPullRequest.id },
				});
			}
			if (side === "no") {
				let newTotal = curPullRequest.noTokenAmount + tokens.amount;
				await curPullRequest.update({
					noTokenAmount: newTotal,
					where: { id: curPullRequest.id },
				});
			}

			return 201;
		}
	} catch (error) {
		console.log(error);
		return 500;
	}
}

module.exports = setVote;
