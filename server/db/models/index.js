const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UnreadMessageCounts = require("./unreadMessageCounts");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
UnreadMessageCounts.belongsTo(Conversation);
Conversation.hasMany(UnreadMessageCounts);

module.exports = {
  User,
  Conversation,
  Message,
  UnreadMessageCounts
};
