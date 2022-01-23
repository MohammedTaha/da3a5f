const Conversation = require("./conversation");
const ConvoMembers = require("./convoMembers");
const User = require("./user");
const Message = require("./message");
const UnreadMessageCounts = require("./unreadMessageCounts");

// associations
User.hasMany(ConvoMembers);
ConvoMembers.belongsTo(User);
Conversation.hasMany(ConvoMembers)
ConvoMembers.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.belongsTo(Conversation);
Conversation.hasMany(UnreadMessageCounts);
UnreadMessageCounts.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  UnreadMessageCounts
};
