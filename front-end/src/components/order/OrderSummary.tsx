import React, {useEffect, useState} from 'react';

import { CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import {cartRequest} from "../../userEffects/cartRequest";
import {IItemToCard} from "../cart/CartCard";
import {OrderGoodCard} from "./OrderGoodCard";

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

export interface IOrderSummaryProps {
  delivery: string;
  payment: string;

}


export const OrderSummary = ({delivery, payment}: IOrderSummaryProps) => {
  const [cart, setCart] = useState<Array<IItemToCard> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const classes = useStyles();


  function setCartT(arg: number) {
    setCartTotal(prevState => prevState + arg);
  };

  function countTotal(){
    if (delivery === "Take Away") {
      return 0;
    } else if (delivery ==="PPL") {
      return 27;
    } else {
      return 32;
    }
  }


  useEffect(() => {
    itemsRequest()
      .then(result => {
        if (result.status === 200) {
          setCart(result.arrayItems);
        } else {
          console.error("Good request is wrong" + result.errorText);
          setError(result.errorText);
        }
      }, error => {
        console.error("Unknown error");
      });

  }, []);

  if (window.localStorage.getItem("cart") == null) {
    return (
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Typography variant="h5">Cart is empty</Typography>
      </Grid>
    );
  } else if (cart === undefined) {
    return (
      <CircularProgress/>
    );
  } else {
    return (
      <>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            {cart.map((item) => {
                return (
                  <Grid item key={item.id}>
                    <OrderGoodCard good={item} setCartT={setCartT}></OrderGoodCard>
                  </Grid>
                );
              }
            )}
          </Grid>
          <Grid item className={classes.gridItem}
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            > <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>subtotal</Typography>
              <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>GBR  {cartTotal.toFixed(2)}</Typography>

            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            > <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>delivery</Typography>
              <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>GBR {countTotal().toFixed(2)}</Typography>

            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            > <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>TOTAL</Typography>
              <Typography variant="h6" component="h6"
                          className={classes.gridTotal}>GBR  {(countTotal() + cartTotal).toFixed(2)}</Typography>

            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
};