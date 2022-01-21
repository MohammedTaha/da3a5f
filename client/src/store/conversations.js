import {
  setConversationsInStore,
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  unsetUnreadMessagesCount,
  onOverrideConversationReadCounts,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const UNSET_UNREAD_MESSAGES_COUNT = "UNSET_UNREAD_MESSAGES_COUNT";
const OVERRIDE_CONVERSATION_READ_COUNTS = "OVERRIDE_CONVERSATION_READ_COUNTS";

// ACTION CREATORS

export const gotConversations = (conversations) => {
  return {
    type: GET_CONVERSATIONS,
    conversations,
  };
};

export const setNewMessage = (message, sender, isConversationActive) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null, isConversationActive},
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const unsetUnreadMessagesCountAction = ({conversationId, senderId}) => {
  return {
    type: UNSET_UNREAD_MESSAGES_COUNT,
    payload: {conversationId, senderId},
  };
};

export const overrideConversationReadCounts = ({conversationId, unreadCounts}) => {
  return {
    type: OVERRIDE_CONVERSATION_READ_COUNTS,
    payload: {conversationId, unreadCounts},
  };
}
// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return setConversationsInStore(state, action);
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case UNSET_UNREAD_MESSAGES_COUNT:
      return unsetUnreadMessagesCount(
        state,
        action.payload
      );
    case OVERRIDE_CONVERSATION_READ_COUNTS: 
        return onOverrideConversationReadCounts(
          state, 
          action.payload
        );
    default:
      return state;
  }
};

export default reducer;
