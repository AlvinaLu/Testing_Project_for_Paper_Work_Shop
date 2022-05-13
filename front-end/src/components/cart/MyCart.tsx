import React, {useContext, useEffect, useState} from 'react';

import {Button, CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {IGood} from "../goods/Goods";
import {CartCard, IItemToCard} from "./CartCard";
import {cartRequest} from "../../userEffects/cartRequest";
import {generatePath, Link} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1
  },
  gridItem: {
    backgroundColor: "#ffffff"
  },
  gridTotal: {
    marginRight: 24,
  },
  categories: {
    background: "#8dc4ae",
    textAlign: 'center',
    wight: "100%"
  },
  goodsList: {
    background: "#38b42e",
    textAlign: 'left',
  },
  cartButton: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(2),
  },
}));

export const itemsRequest = () => {
  const iItemRequest = cartRequest();
  return iItemRequest;
};

export interface IGoodProps {
  good: IGood;
}

export const MyCart = () => {
  const [cart, setCart] = useState<Array<IItemToCard> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const classes = useStyles();
  const {user} = useContext(UserContext);



  function setCartT(arg: number) {
    setCartTotal(prevState => prevState + arg);
  };


  useEffect(() => {
    itemsRequest()
      .then(result => {
        if (result.status === 200) {
                    setCart(result.arrayItems);
        } else {
          setError(result.errorText);
          console.error("Good request is wrong" + error);

        }
      }, error => {
        console.error("Unknown error");
      });
  }, []);

  if (window.localStorage.getItem("cart") === null) {
    return (
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Typography variant="h1">Cart is empty</Typography>
      </Grid>
    );
  } else if (cart === undefined) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <Container>
        <Grid
          xs={12}
          container
          spacing={3}
          direction="column"
          justify="flex-end"
          alignItems="stretch"
        >
          <Grid item>
            {cart.map((item) => {
                return (
                  <Grid item key={item.id}>
                    <CartCard good={item} cartTotal={cartTotal} setCartT={setCartT}/>
                  </Grid>
                );
              }
            )}
          </Grid>
          <Grid item className={classes.gridItem}
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end">

              <Typography variant="h5" component="h5" className={classes.gridTotal}>GBR {cartTotal.toFixed(2)}</Typography>
            {user!=null? <Button
              id="goToCheckout"
              component={Link}
              to={generatePath("/order")}
              className={classes.cartButton}
              size="large"
              variant="contained"
            >GO TO CHECKOUT</Button> : <Button
              id="goToSignIn"
              component={Link}
              to={"/sign-in"}
              className={classes.cartButton}
              size="large"
              variant="contained"
            >GO TO CHECKOUT</Button>}
          </Grid>
        </Grid>
      </Container>
    );
  }
};