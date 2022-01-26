const Sequelize = require("sequelize");
const db = require("../db");

const ConvoMembers = db.define("convoMembers", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ConvoMembers;
