const { Sequelize } = require("sequelize");
const db = require("../db");
const Transfer = require("./Transfer");

const Repo = db.define("repo", {
	owner: {
		type: Sequelize.STRING(),
		allowNull: false,
	},
	repo_id: {
		type: Sequelize.STRING(),
		unique: true,
		allowNull: false,
	},
	head: {
		type: Sequelize.STRING(),
		defaultValue:
			"6563f8e28a947405385d56a5afd3c93e01929268e4158dba555a82d7aa5b2a8f",
	},
	tokenAmount: {
		type: Sequelize.STRING(),
		defaultValue: 1_000_000,
	},
	contributor_id: {
		type: Sequelize.STRING(),
	},
	quorum: {
		type: Sequelize.STRING(),
		defaultValue: ".5",
	},
	inSession: {
		type: Sequelize.BOOLEAN(),
		defaultValue: false,
	},
});

const initialBalance = async (Repo) => {
	await Transfer.create({
		from: Repo.contributor_id,
		to: Repo.contributor_id,
		repo_id: Repo.repo_id,
		amount: Repo.tokenAmount,
	});
};

const unFreeze = async (Repo) => {
  // const frozen = await PullRequest.findAll({
  //   where: { repo_id: repo.repo_id, state: "frozen" },
  // });
  // for (let i = 0; i < frozen.length; i++) {
  //   if (
  //     frozen[i].dataValues.yesTokenAmount === 0 &&
  //     frozen[i].dataValues.noTokenAmount === 0
  //   ) {
  //     console.log("frozen vote pr", frozen[i]);
  //     console.log("frozen vote pr", frozen[i].dataValues);
  //     console.log("frozen vote pr", frozen[i].dataValues.id);
  //     await PullRequest.update({
  //       state: "vote",
  //       where: { id: frozen[i].dataValues.id },
  //     });
  //   } else {
  //     console.log("frozen pre open pr", frozen[i]);
  //     await PullRequest.update({
  //       state: "pre-open",
  //       where: { id: frozen[i].dataValues.id },
  //     });
  //   }
  // }
  console.log(Repo)
}

Repo.afterBulkUpdate(console.log('#> after bulk update'), unFreeze)
Repo.afterUpdate(console.log('#> after update'), unFreeze)
Repo.beforeUpdate(console.log('#> before update'), unFreeze)


Repo.afterCreate(initialBalance);
module.exports = Repo;
