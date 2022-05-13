import React, {useContext, useEffect, useState} from 'react';

import {Avatar, CircularProgress, Container, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {IOrdersRequest, orders} from "../../userEffects/ordersRequest";
import {MyOrder} from "./MyOrder";
import {UserContext} from "../../context/UserContext";
import {IItemToCard} from "../cart/CartCard";
import {Person} from "../order/Persona";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1,
    marginTop: 8
  },
  gridItem: {
    backgroundColor: "#ffffff"
  },
  gridTotal: {
    marginRight: 24,
  },
  categories: {
    textAlign: 'center',
    wight: "100%"
  },
  goodsList: {
      textAlign: 'left',
  },
  cartButton: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(2),
  },
  contact: {
    margin: 8,
    padding: 8,
    minWight: "800px",
  },
  avatarItem: {
    margin: "30px",
    backgroundColor: theme.palette.primary.light,
    width: "50px",
    height: "50px",
  },
  parerProp: {
    margin: 8,
  },
  personal: {
    marginTop: 36,
  }
}));

export interface IOrders {
  id: number;
  date: Date;
  status: string;
  cart: Array<IItemToCard>;
  totalSum: number;
  deliveryCompany: string;
}

export const myOrders = (user: string) => {
  const iOrdersRequest = orders(new class implements IOrdersRequest {
    sessionId = user;
  });
  return iOrdersRequest;
};


export const Orders = () => {
  const [orders, setOrders] = useState<Array<IOrders> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const classes = useStyles();
  const {user} = useContext(UserContext);


  useEffect(() => {
    myOrders(user)
      .then(result => {
        if (result.status === 200) {
          setOrders(result.orders)
        } else {
          console.error("Orders request is wrong" + result.errorText);
          setError(result.errorText);
        }
      }, error => {
        console.error("Unknown error");
      });
  }, []);

  if (orders === undefined) {
    return (<CircularProgress/>);
  } else if (orders?.length === 0) {
    return (
      <Container className={classes.root}>
        <Grid xs={12}>

          <Paper className={classes.parerProp}>
            <Grid item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
            >
              <Grid item>
                <Avatar className={classes.avatarItem}>YOU</Avatar>
              </Grid>
              <Grid>
                <Person/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          <Typography variant="h5" component="h5" style={{margin: 24}}> YOU HAVE NOT ORDERS YET </Typography>
        </Grid>
      </Container>);
  } else {
    return (
      <Container>
        <Grid xs={12}>

          <Paper className={classes.parerProp}>
            <Grid item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
            >
              <Grid item>
                <Avatar className={classes.avatarItem}>YOU</Avatar>
              </Grid>
              <Grid>
                <Person/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid

          container
          spacing={
            3
          }
          direction="column"
          justify="flex-end"
          alignItems="stretch"
        >
          < Grid
            item>
            {
              orders.slice(0).reverse().map((item) => {
                  return (
                    <Grid item key={item.id}>
                      <MyOrder order={item}/>
                    </Grid>
                  );
                }
              )
            }
          </Grid>
        </Grid>
      </Container>
    );
  }
};