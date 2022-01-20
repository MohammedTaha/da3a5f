import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: (props) => props.color,
    fontWeight: (props) => props.fontWeight,
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const unreadMessageStyles = { fontWeight: "bold", color: "#000" };
  const readMessageStyles = { fontWeight: "normal", color: "#9CADC8" };
  const { conversation, haveUnreadMessages } = props;
  const { latestMessageText, otherUser } = conversation;
  const classes = useStyles(
    haveUnreadMessages ? unreadMessageStyles : readMessageStyles
  );

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
