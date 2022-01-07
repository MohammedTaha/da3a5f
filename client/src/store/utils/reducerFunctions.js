export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo

  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  let cIndex = state.findIndex(({ id }) => id === message.conversationId);
  if (cIndex > -1) {
    state[cIndex] = {
      ...state[cIndex],
      latestMessageText: message.text,
      messages: [message, ...state[cIndex].messages],
    };
    return [].concat(...state);
  }
  return state;
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
  let cIndex = state.findIndex(({ otherUser }) => otherUser.id === recipientId);

  if (cIndex > -1) {
    state[cIndex] = {
      ...state[cIndex],
      id: message.conversationId,
      messages: [...state[cIndex].messages, message],
      latestMessageText: message.text,
    };
    return [].concat(...state);
  }
  return state;
};
