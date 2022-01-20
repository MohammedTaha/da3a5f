import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateUnreadMessagesCountAction
} from "./store/conversations";


const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    const activeConversation = store.getState().activeConversation;
    const thisConversation = store.getState().conversations.find(conversation => conversation.id === data.message.conversationId);
    let isConversationActive = false;
    if (thisConversation?.otherUser?.username) {
      isConversationActive = activeConversation === thisConversation.otherUser.username
    }
    store.dispatch(setNewMessage(data.message, data.sender, isConversationActive));
  });
  socket.on('notify-already-read', ({ conversationId, senderId}) => {
    store.dispatch(updateUnreadMessagesCountAction({ conversationId, senderId}));
  })

});

export default socket;
