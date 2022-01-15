import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent, UnreadMessagesCountBadge } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { markAsRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;
  const unreadMsgs = conversation.unreadMessageCounts
    ? conversation.unreadMessageCounts.find(
        (item) => item.senderId === conversation.otherUser.id
      )
    : null;

  const handleClick = async (conversation) => {
    if (unreadMsgs && unreadMsgs.count) {
      await props.markAsRead({
        conversationId: conversation.id,
        senderId: conversation.otherUser.id,
      });
    }
    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <UnreadMessagesCountBadge count={unreadMsgs ? unreadMsgs.count: 0} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markAsRead: (convoDetails) => {
      dispatch(markAsRead(convoDetails));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
