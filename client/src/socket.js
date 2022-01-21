import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  unsetUnreadMessagesCountAction,
  overrideConversationReadCounts
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
    store.dispatch(setNewMessage(data.message, data.sender));
  });

  socket.on('notify-already-read', ({ conversationId, senderId}) => {
    store.dispatch(unsetUnreadMessagesCountAction({ conversationId, senderId}));
  });

  socket.on('update-unread-counts', (data) => {
    store.dispatch(overrideConversationReadCounts(data));
  })

});

export default socket;
