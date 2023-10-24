const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const db = require("../db");
const Repo = require("./Repo");

const PullRequest = db.define(
	"pullrequest",
	{
		issue_id: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		head: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		branchDefaultHash: {
			type: Sequelize.STRING(),
			allowNull: false,
			defaultValue: "branchDefaultHash",
		},
		remoteURL: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		baseBranch: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		fork_branch: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		title: {
			type: Sequelize.STRING(),
		},
		state: {
			type: Sequelize.STRING(),
			defaultValue: "vote",
			allowNull: false,
		},
		defaultHash: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		childDefaultHash: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
		mergeable: {
			type: Sequelize.BOOLEAN(),
			defaultValue: true,
			allowNull: false,
		},
		yesTokenAmount: {
			type: Sequelize.INTEGER(),
			defaultValue: 0,
		},
		noTokenAmount: {
			type: Sequelize.INTEGER(),
			defaultValue: 0,
		},
		repo_id: {
			type: Sequelize.STRING(),
			allowNull: false,
		},
	},
	{
		hooks: {
			afterUpdate: async (pr) => {
				const repo = await Repo.findOne({ where: { repo_id: pr.repo_id } });
				const quorum = repo.quorum;
				const voteTotals = Number(pr.yesTokenAmount) + Number(pr.noTokenAmount);
				const percentVoted = voteTotals / 1000000;

				const updated = pr.defaultHash !== pr.childDefaultHash;

				if (percentVoted > quorum && !updated && pr.mergeable) {
					const yesRatio = pr.yesTokenAmount / pr.noTokenAmount;
					if (yesRatio > 1) {
						if (pr.status !== "merge") {
							await PullRequest.update(
								{ state: "merge" },
								{ where: { id: pr.id } }
							);
							const frozen = await PullRequest.findAll({
								where: { repo_id: repo.repo_id, state: "frozen" },
							});
							for (let i = 0; i < frozen.length; i++) {
								if (
									frozen[i].dataValues.yesTokenAmount === 0 &&
									frozen[i].dataValues.noTokenAmount === 0
								) {
									await frozen[i].update({
										state: "vote",
									});
								} else {
									await frozen[i].update({
										state: "pre-open",
									});
								}
							}
							await Repo.update(
								{ inSession: false },
								{ where: { repo_id: repo.repo_id } }
							);
						}
					} else {
						if (pr.status !== "close") {
							await PullRequest.update(
								{ state: "close" },
								{ where: { id: pr.id } }
							);
							await Repo.update(
								{ inSession: false },
								{ where: { repo_id: repo.repo_id } }
							);
						}
					}
				} else if (!pr.mergeable && updated) {
					if (pr.status !== "conflict") {
						await PullRequest.update(
							{ state: "conflict" },
							{ where: { id: pr.id } }
						);
					}
				} else if (pr.mergeable && updated) {
					if (pr.status !== "update") {
						await PullRequest.update(
							{ state: "update" }, // PR is updated.
							{ where: { id: pr.id } }
						);
					}
					// Pre-open votes
				} else if (percentVoted <= 0 && !updated && pr.mergeable) {
					await PullRequest.update({ state: "vote" }, { where: { id: pr.id } });
				} else if (
					percentVoted > 0 &&
					percentVoted <= 0.1 &&
					!updated &&
					pr.mergeable
				) {
					await PullRequest.update(
						{ state: "pre-open" },
						{ where: { id: pr.id } }
					);
				} else {
					if (pr.status !== "open") {
						await PullRequest.update(
							{ state: "open" },
							{ where: { id: pr.id } }
						);
						await PullRequest.update(
							{ state: "frozen" },
							{ where: { state: ["vote", "pre-open"], repo_id: repo.repo_id } }
						),
							await Repo.update(
								{ inSession: true },
								{ where: { repo_id: repo.repo_id } }
							);
					}
				}
			},
		},
	}
);

module.exports = PullRequest;
