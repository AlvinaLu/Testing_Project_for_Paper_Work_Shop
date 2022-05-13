import React, {useContext, useState} from 'react';

import {
  Button,
  Container,
  Grid,
  makeStyles, Paper,
  Typography
} from "@material-ui/core";
import {IGoodProps} from "./Goods";
import {generatePath, Link} from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {CountContext} from "../../context/CountContext";
import {AdminContext} from "../../context/AdminContext";



const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
    textAlign: 'center',
    minHeight: "400px",
  },
  box: {
    minHeight: "50px",
    background: "#ffffff",
    display: "table",
    textAlign: "center",
  },
  text: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  footer: {
    padding: 5,
  },
  price: {
    paddingTop: 8,
    background: "#ffffff",
    marginLeft: 10,
    textAlign: 'center',
  },
  imageBox: {
    background: "#ffffff",
    minHeight: 200,
    minWight: 200,
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    wight: 200,
  },
  padTop: {
    marginTop: 16
  },
  cardButton: {
    color: theme.palette.primary.dark,
  },
  menuButton: {
    color: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
}));

export interface IGoodToCard {
  id: number;
  count: number;
}

export interface IGoodsToCard {
  card: Array<IGoodToCard>;
}

export function AddGoodToCard(good: IGoodToCard) {
  let cart: any

  if (window.localStorage.getItem("cart") === null) {
    cart = {}
  } else {
    cart = JSON.parse(window.localStorage.getItem("cart")!!)
  }

  let count: number | undefined = cart[`${good.id}`]
  if (count === undefined || count === 0) {
    cart[`${good.id}`] = good.count;
  } else {
    cart[`${good.id}`] = good.count;
  }

  window.localStorage.setItem("cart", JSON.stringify(cart));
}

export const checkAmount = (id: number) => {
  let tmp: number;
  tmp = 0;
  let cart: any;
  if (window.localStorage.getItem("cart") != null) {
    let countGood = 0
    cart = JSON.parse(window.localStorage.getItem("cart")!!)
    for (const [key, value] of Object.entries<number>(cart)) {
      if (parseInt(key) === id) {
        tmp = value;
      }
    }
  }
  return tmp;
}

export const GoodCard = ({good}: IGoodProps) => {
  const classes = useStyles();
  const [errorAddCart, setErrorAddCart] = useState(" ");
  const {count, setCount} = useContext(CountContext);
  const {admin} = useContext(AdminContext);

  function handleAddGood() {
    if (good !== undefined) {
      let tmp: number;
      tmp = checkAmount(good.id);
      if (good.amount - tmp >= 1) {
        setCount(count + 1);
        AddGoodToCard({id: good.id, count: tmp + 1});
      } else {
        setErrorAddCart("No more items in the store");
      }
    }

  };


  return (
      <Paper id={good.id.toString()} className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
            >
            </Grid>
            <Container className={classes.box} fixed>
              <Typography style={{backgroundColor: "#c1bebe", wordBreak: "break-all"}}>{good.name}</Typography>
              <Typography style={{color: "#ec0909"}}>{errorAddCart}</Typography>
            </Container>
          </Grid>
          <Grid item >
            <Container className={classes.imageBox} component={Link} to={generatePath(":category/:id", {
              category: good.category,
              id: good.id
            })}>
              <img src={`/${good.id}.jpg`} width="200px"></img>
            </Container>
          </Grid>

            <Grid item className={classes.footer}
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center">
              <Grid item>
                <Typography className={classes.price} variant="h5">GBR {good.price.toFixed(2)}</Typography>
              </Grid>
              <Grid item>
                <Button id={`good${good.id}`} variant="outlined" className={classes.menuButton}
                        onClick={handleAddGood}><ShoppingCartOutlinedIcon
                  className={classes.cardButton}></ShoppingCartOutlinedIcon></Button>
              </Grid>

          </Grid>
        </Grid>
      </Paper>
  );
};