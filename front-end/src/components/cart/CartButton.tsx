import React, {useContext, useEffect} from 'react';
import {
  Badge,
  makeStyles,

} from "@material-ui/core";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {CountContext} from "../../context/CountContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  badge: {},
  cartButton: {
    color: theme.palette.primary.dark,
  }
}));


export const CartButton = () => {
  const {count, setCount} = useContext(CountContext);
  const classes = useStyles();

  useEffect(() => {
    if (window.localStorage.getItem("cart") != null) {
      let countGood=0
      let cart = JSON.parse(window.localStorage.getItem("cart")!!)
      for (const [key, value] of Object.entries<number>(cart)) {
        countGood += value;
      }
      setCount(countGood);
    }
  }, []);

  return (
    <>
      <Badge id="btnRoundedCard" className={classes.badge} badgeContent={count} color="primary"><ShoppingCartOutlinedIcon
        className={classes.cartButton}></ShoppingCartOutlinedIcon></Badge>


    </>
  );
};




