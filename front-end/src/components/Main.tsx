import React from "react";

import {makeStyles, Paper} from "@material-ui/core";
import {Navigation} from "./Navigation";
import {AppRoutesComponent} from "./AppRoutes";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#ffffff",
  },
  navigationBar: {
    margin: 8,
  },
  contentArea: {
    minHeight: "750px",
    padding: "8px"
  }
}));

export const Main = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.navigationBar}>
        <Navigation/>
      </Paper>
      <Paper className={classes.contentArea}>
        <AppRoutesComponent/>
      </Paper>
    </div>
  );
};