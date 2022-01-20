import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: "#3A8DFF",
    color: "#fff",
  },
}));

const UnreadMessagesCountBadge = (props) => {
  const classes = useStyles();
  const { count } = props;

  return (
    <Badge
      showZero={false}
      classes={{ badge: classes.badge }}
      badgeContent={count}
    />
  );
};

export default UnreadMessagesCountBadge;
