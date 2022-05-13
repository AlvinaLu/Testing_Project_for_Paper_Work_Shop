import React, {useEffect} from 'react';

import {
  Button,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {generatePath, Link} from "react-router-dom";
import {IItemToCard} from "../cart/CartCard";


const useStyles = makeStyles((theme) => ({
  box: {
  },
  gridItem: {
    justify:"center",
    alignItems:"center"
  },
  imageBox: {
    minHeight: "80px",
    minWight: "80px",
  },
  text: {
  },
  addButton: {
    color: theme.palette.primary.dark,
  },
  button: {
    marginTop: 6,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  },
  warning: {
    color: "#fc0000"
  },
  gridItemEffect: {
    margin: 24,
    textDecoration: "line-through",
  },
  delEffect: {
    color: "#fc0000",
  },
  delBox: {
    marginLeft: 100,
  },
  textColor: {
    color: "#959494",
  },

}));

export interface IGoodPropsToCard {
  good: IItemToCard;
}


export const OrderCard= ({good}: IGoodPropsToCard) => {
  const classes = useStyles();


  useEffect(() =>{

  }, [])


  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      style={{backgroundColor: "#e2dfdf", marginBottom: 8}}
    >
      <Grid item style={{marginLeft: 16}}>
        <Button className={classes.imageBox} component={Link} to={generatePath(":category/:id", {
          category: good.category,
          id: good.id
        })}>
          <img src={`/${good.id}.jpg`} width="80px"></img>
        </Button>
      </Grid>
      <Grid item style={{marginLeft: 24}}>
        <Grid container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
        >
          <Typography variant="h6" style={{wordBreak: "break-all"}}>{good.name}</Typography>
          <Typography className={classes.text}>Qty: {good.count}</Typography>
          <Typography className={classes.text}>Price: GBR {good.price.toFixed(2)}</Typography>
          <Typography className={classes.text}>Total price:  GBR {(good.price*good.count).toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};