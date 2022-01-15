const Sequelize = require("sequelize");
const db = require("../db");

const UnreadMessageCounts = db.define("unreadMessageCounts", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
//   lastUpdatedOn: {
//     type: Sequelize.DATE,
//     allowNull: false,
//   },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UnreadMessageCounts;
