import React, {useContext, useEffect, useState} from 'react';

import {CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {UserContext} from "../../context/UserContext";
import {IItemToCard} from "../cart/CartCard";
import {clientOrders, IClientOrdersRequest} from "../../userEffects/clentOrdersRequest";
import {MyClientOrder} from "./MyClientOrder";



const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1,
    marginTop: 120
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

export interface IClientOrders {
  name: string,
  surname: string,
  email: string,
  id: number;
  date: Date;
  status: string;
  cart: Array<IItemToCard>;
  totalSum: number;
  deliveryCompany: string;
  paymentMethod: string;
}

export const myClientOrders = (user: string) => {
  const iClientOrdersRequest = clientOrders(new class implements IClientOrdersRequest {
    sessionId = user;
  });
  return iClientOrdersRequest;
};



export const ClientOrders = () => {
  const [orders, setOrders] = useState<Array<IClientOrders> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const classes = useStyles();
  const {user} = useContext(UserContext);


  useEffect(() => {
    myClientOrders(user)
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
  }else if( orders?.length===0){
    return(
      <Container className={classes.root}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          <Typography variant="h5" component="h5" style={{margin: 24}}> HAVE NOT ORDERS YET </Typography>
        </Grid>
      </Container>);
  }
  else {
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
            {orders.slice(0).reverse().map((item) => {
                return (
                  <Grid item key={item.id}>
                    <MyClientOrder order={item}/>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }
};