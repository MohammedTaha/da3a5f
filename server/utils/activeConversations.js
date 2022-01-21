class ActiveConversations {
  conversations = [];
  activeConversationsMap = {}; // details against conversation Id
  activeUsersMap = {}; // reverse map, having conversation id against sender id

  removeUserFromACM(senderId) {
    let lastActiveConvo = this.activeUsersMap[senderId];
    let senderIndex = this.activeConversationsMap[
      lastActiveConvo
    ].senders.findIndex(({ id }) => id === senderId);

    this.activeConversationsMap[lastActiveConvo].senders.splice(senderIndex, 1);
  }
  setAsActive({ conversationId, senderId }) {
    if (!conversationId || !senderId) {
      return;
    }

    if (this.activeUsersMap[senderId]) {
      this.removeUserFromACM(senderId);
    }

    this.activeConversationsMap[conversationId] =
      this.activeConversationsMap[conversationId] || {};
    this.activeConversationsMap[conversationId].senders =
      this.activeConversationsMap[conversationId].senders || [];
    this.activeConversationsMap[conversationId].senders.push({ id: senderId });

    this.activeUsersMap[senderId] = conversationId;
  }

  setAsInactive(senderId) {
    // should be called when user went offline or gets logged out
    if (this.activeUsersMap[senderId]) {
      this.removeUserFromACM(senderId);
      delete this.activeUsersMap[senderId];
    }
  }

  getConnectedUsers(conversationId) {
    if (!this.activeConversationsMap[conversationId]) {
      return [];
    }
    return this.activeConversationsMap[conversationId].senders.map(
      ({ id }) => id
    );
  }

  getIsActiveFor({ conversationId, recipientId }) {
    if (!this.activeConversationsMap[conversationId]) {
      return false;
    }
    let connectedUsers = this.activeConversationsMap[conversationId].senders;
    if (connectedUsers.some(({ id }) => id === recipientId)) {
      return true;
    }

    return false;
  }
}

module.exports = new ActiveConversations();
