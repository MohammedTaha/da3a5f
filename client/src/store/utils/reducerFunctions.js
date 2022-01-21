export const setConversationsInStore = (state, payload) => {
  // return payload.conversations
  return payload.conversations.map((convo) => {
    const allMsgs = convo.messages.map(
      ({ isLastReadMessage, ...defaultProps }) => defaultProps
    );
    const unread = convo.unreadMessageCounts.find((c) => !!c.count);
    if (unread) {
      const lastReadMessage = allMsgs[allMsgs.length - 1 - unread.count];
      if (lastReadMessage) {
        lastReadMessage.isLastReadMessage = true;
      }
    }
    return {
      ...convo,
      messages: allMsgs,
    };
  });
};

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo

  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.unreadMessageCounts = [
      { conversationId: message.conversationId, senderId: sender.id, count: 1 },
    ];
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      return {
        ...convo,
        messages: [...convo.messages, message],
        latestMessageText: message.text,
      };
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      return {
        ...convo,
        id: message.conversationId,
        unreadMessageCounts: [
          {
            conversationId: message.conversationId,
            senderId: message.senderId,
            recipientId: recipientId,
            count: 1,
          },
          {
            conversationId: message.conversationId,
            senderId: recipientId,
            recipientId: message.senderId,
            count: 0,
          },
        ],
        messages: [...convo.messages, message],
        latestMessageText: message.text,
      };
    } else {
      return convo;
    }
  });
};

export const unsetUnreadMessagesCount = (
  state,
  { conversationId, senderId }
) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      convo.messages = convo.messages.map(
        ({ isLastReadMessage, ...defaultProps }) => defaultProps
      );
      return {
        ...convo,
        unreadMessageCounts: convo.unreadMessageCounts.map((item) => {
          if (item.senderId === senderId) {
            return { ...item, count: 0 };
          }
          return item;
        }),
      };
    } else {
      return convo;
    }
  });
};

export const onOverrideConversationReadCounts = (
  state,
  { conversationId, unreadCounts }
) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const allMsgs = convo.messages.map(
        ({ isLastReadMessage, ...defaultProps }) => defaultProps
      );
      const unread = unreadCounts.find((c) => !!c.count);
      if (unread) {
        const lastReadMessage = allMsgs[allMsgs.length - 1 - unread.count];
        if (lastReadMessage) {
          lastReadMessage.isLastReadMessage = true;
        }
      }
      return {
        ...convo,
        messages: allMsgs,
        unreadMessageCounts: unreadCounts,
      };
    }
    return convo;
  });
};
