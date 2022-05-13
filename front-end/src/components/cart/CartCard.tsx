import React, {useContext, useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {generatePath, Link} from "react-router-dom";
import {CountContext} from "../../context/CountContext";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {AddGoodToCard, checkAmount} from "../goods/GoodGard";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 8,
    minWight: "800px",
  },
  box: {
    minWight: "800px",
  },
  gridItem: {
    margin: 24,
    justify:"center",
    alignItems:"center"
  },
  imageBox: {
    background: "#618fd4",
    minHeight: "100px",
    minWight: "100px",
  },
  text: {
    marginTop: 8,
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

export interface IGoodPropsToCart {
  good: IItemToCard;
  cartTotal: number;
  setCartT: (arg: number) => void;
}

export interface IItemToCard {
  id: number;
  name: string;
  amount: number;
  price: number;
  category: number;
  count: number;
}


export const CartCard = ({good, cartTotal, setCartT}: IGoodPropsToCart) => {
  const classes = useStyles();
  const [itemsInCart, setItemsInCart] = useState(good.count);
  const [warning, setWarning] = useState<string>("");
  const [total, setTotal] = useState<number>(good.price * good.count);
  const [del, setDel] = useState(false);
  const {count, setCount} = useContext(CountContext);

  useEffect(() =>{
    setCartT(good.count*good.price);
  }, [])


  function handleAddGood() {
    let tmp: number;
    tmp = checkAmount(good.id);
    setItemsInCart(tmp);
    if (good.amount - tmp >= 1) {
      setCount(count + 1);
      setItemsInCart(itemsInCart + 1);
      setTotal((itemsInCart + 1) * good.price);
      setCartT(1 * good.price);
      AddGoodToCard({id: good.id, count: itemsInCart + 1});
    } else {
      setWarning("No more items in the store");
    }
  };

  function handleRemoveGood() {
    if (itemsInCart > 0) {
      setItemsInCart(itemsInCart - 1);
      setCount(count - 1);
      setTotal((itemsInCart - 1) * good.price);
      setCartT(-(1 * good.price));
      AddGoodToCard({id: good.id, count: itemsInCart - 1});
      setWarning("")
    }
  };

  function handleDeleteGood() {
    setCount(count - itemsInCart);
    setCartT(-(total));
    setItemsInCart(0);
    setDel(true);

    AddGoodToCard({id: good.id, count: 0});
  };

  if (del) {
    return (
      <Paper className={classes.root}>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center">

          <Grid item className={classes.gridItemEffect}>
            <Container className={classes.imageBox} component={Link} to={generatePath(":category/:id", {
              category: good.category,
              id: good.id
            })}>
              <img src={`/${good.id}.jpg`} width="100px"></img>
            </Container>
          </Grid>
          <Grid item className={classes.gridItemEffect}>
            <Typography variant="h5" component="h5">{good.name}</Typography>
          </Grid>
          <Grid item className={classes.gridItemEffect}>
            <Typography variant="h5" component="h5">GBP {good?.price.toFixed(2)}</Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography className={classes.delBox} variant="h5" component="h5"></Typography>
          </Grid>

          <Grid item className={classes.gridItemEffect}>
            <Typography variant="h5" component="h5">GBR {total.toFixed(2)}</Typography>
          </Grid>

          <Grid item className={classes.gridItem}>
            <Typography className={classes.delEffect} component="h5" variant="h5">DELETED</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center">
          <Grid item className={classes.gridItem}>
            <Container className={classes.imageBox} component={Link} to={generatePath(":category/:id", {
              category: good.category,
              id: good.id
            })}>
              <img src={`/${good.id}.jpg`} width="100px"></img>
            </Container>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography variant="h5" component="h5">{good.name}</Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
              <Typography variant="h5" component="h6" className={classes.textColor}>price</Typography>
            <Typography variant="h5" component="h5">GBP {good?.price.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
              <Grid item>
                <Button className={classes.addButton} onClick={handleRemoveGood}><RemoveCircleIcon fontSize="large" color="primary"></RemoveCircleIcon></Button>
              </Grid>
              <Grid item>
                <Typography className={classes.text} variant="h5" component="h5">{itemsInCart}</Typography>
              </Grid>
              <Grid item>
                <Button className={classes.addButton} onClick={handleAddGood}><AddCircleIcon fontSize="large" color="primary"></AddCircleIcon></Button>
              </Grid>

            </Grid>
            <Typography className={classes.warning} variant="caption" display="block"
                        gutterBottom>{warning}</Typography>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
            <Typography variant="h5" component="h6" className={classes.textColor}>total</Typography>
            <Typography variant="h5" component="h5">GBR {total.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button className={classes.addButton} onClick={handleDeleteGood}><DeleteIcon fontSize="large"
                                                                                         color="primary"></DeleteIcon></Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};