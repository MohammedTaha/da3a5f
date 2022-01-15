import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
  badge: {
    backgroundColor: "#3A8DFF",
    color: "#fff",
    borderRadius: "25px",
    padding: "2px 8px",
    minWidth: "20px",
    textAlign: "center",
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const UnreadMessagesCountBadge = (props) => {
  const classes = useStyles();

  const { count } = props;
  return (
    <>
      {count ? (
        <Box className={classes.root}>
          <Box>
            <Typography className={classes.badge}>{count}</Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default UnreadMessagesCountBadge;
