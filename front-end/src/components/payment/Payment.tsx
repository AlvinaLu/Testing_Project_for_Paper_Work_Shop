import React, {useContext, useEffect, useState} from 'react';

import {CircularProgress, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import {UserContext} from "../../context/UserContext";
import CircularProgressWithLabel from './CircularProgressWithLabel';
import {IPaymentRequest, paymentRequest} from "../../userEffects/paymentRequest";
import {AppRoutes} from "../AppRoutes";
import {useHistory} from "react-router-dom";
import {CountContext} from "../../context/CountContext";

const useStyles = makeStyles((theme) => ({
  root: {
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


export const myPaymentRequest = (user: string) => {
  const iPaymentRequest = paymentRequest(new class implements IPaymentRequest {
    sessionId = user;
  });
  return iPaymentRequest;
};


export const Payment = () => {
  const classes = useStyles();
  const [error, setError] = useState<string | undefined>(undefined);
  const [go, setGo] = useState(false);
  const [sum, setSum] = useState<number | undefined>(undefined);
  const [payment, setPayment] = useState<boolean | undefined>(undefined);
  const {user} = useContext(UserContext);
  const {count, setCount} = useContext(CountContext);
  const history = useHistory();

  useEffect(() => {
    myPaymentRequest(user)
      .then(result => {
        if (result.status === 200) {
          setSum(result.sum);
          setPayment(result.payment);
        } else {
          console.error(result.errorText);
          setError(result.errorText);
        }
      });
    setTimeout(function () {
      setGo(true);
      goToHome();
    }, 8000);

  }, [])


  function goToHome() {
    setTimeout(function () {
      window.localStorage.removeItem("cart");
      setCount(0);
      history.push(AppRoutes.home.path)
    }, 5000)
  }

  if (sum === undefined && payment === undefined) {
    return (
      <CircularProgress/>
    );
  } else if (payment && !go) {
    return (
      <Container className={classes.root}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          <Typography variant="h5" component="h5" style={{margin: 24}}>Total sum : GBR {sum?.toFixed(2)}</Typography>
          <Typography variant="h5" component="h5" style={{margin: 24}}> GO TO BANK PAGE...</Typography>
          <CircularProgressWithLabel/>
          <Typography variant="h5" component="h5" style={{margin: 24}}>...AND COME BACK</Typography>
        </Grid>
      </Container>
    );
  } else if (!payment && !go) {
    return (
      <Container className={classes.root}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          <Typography variant="h5" component="h5" style={{margin: 24}}>Total sum : GBR {sum?.toFixed(2)} You will pay by
            cash</Typography>
        </Grid>
      </Container>);
  } else if (error !== undefined && go) {
    return (
      <Container className={classes.root}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          <Typography variant="h5" component="h5" style={{margin: 24}}> THERE IS SOMETHING WRONG WITH YOUR PAYMENT,
            PLEASE TRY AGAIN LATER </Typography>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container className={classes.root}>
        <Grid container
              direction="column"
              justify="center"
              alignItems="center">
          {payment ?
            <Typography variant="h5" component="h5" style={{margin: 24}}> YOUR PAYMENT IS OK, YOU WILL BE REDIRECT TO
              PAGE
              HOME </Typography> :
            <Typography variant="h5" component="h5" style={{margin: 24}}> YOU WILL BE REDIRECT TO PAGE
              HOME </Typography>}

        </Grid>
      </Container>
    );
  }
};