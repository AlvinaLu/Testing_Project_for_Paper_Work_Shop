import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import {
  Avatar,
  Button,
  Container, Dialog, DialogActions, DialogContent, DialogContentText,
  Grid,
  makeStyles,
  Paper, Radio, RadioProps,
  TextField,
  Typography, withStyles
} from "@material-ui/core";
import {IItemToCard} from "../cart/CartCard";
import { useHistory} from "react-router-dom";
import {OrderSummary} from "./OrderSummary";
import {AppRoutes} from "../AppRoutes";
import {cookies} from "../login/SingUp";
import {IOrderRequest, orderRequest} from "../../userEffects/orderRequest";
import {Person} from "./Persona";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1
  },
  avatarItem: {
    margin: "25px",
    backgroundColor: theme.palette.primary.light,
    width: "25px",
    height: "25px",
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
  parerProp: {
    margin: 8,
  },
  personal: {
    marginTop: 36,
  }
}));

const MyRadio = withStyles({
  root: {
    color: "#18A0FB",
    '&$checked': {
      color: "#18A0FB",
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export interface IOrder {
  firstName: string
  lastName: string
  postalCod: string
  address: string
  city: string
  number: string
  info: string
}


export const NewOrderRequest = (delivery: string, payment: string, firstName: string, lastName: string, postalCod: string, address: string, city: string, number: string, info: string) => {
  let order: IOrder;
  order = {
    firstName: firstName,
    lastName: lastName,
    postalCod: postalCod,
    address: address,
    city: city,
    number: number,
    info: info
  }

  const iOrderRequest = orderRequest(new class implements IOrderRequest {
    sessionId = cookies.get("sessionId");
    delivery = delivery;
    payment = payment;
    cart = JSON.parse(window.localStorage.getItem("cart")!!);
    shipping = order;
  });
  return iOrderRequest;
};


export const Order = () => {


  const [error, setError] = useState<string | undefined>(undefined);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("Take Away");
  const [selectedValuePayment, setSelectedValuePayment] = useState<string>("PayPal");
  const [sum, setSum] = useState<number | undefined>(undefined);
  const [openPPL, setOpenPPL] = useState(false);
  const [openDPH, setOpenDPH] = useState(false);
  const [openTA, setOpenTA] = useState(false);
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [warningName, setWarningName] = useState("");
  const [lastName, setLastName] = useState("");
  const [warningLastName, setWarningLastName] = useState("");
  const [postalCod, setPostalCod] = useState("");
  const [warningPostCode, setWarningPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [warningAddress, setWarningAddress] = useState("");
  const [city, setCity] = useState("");
  const [warningCity, setWarningCity] = useState("");
  const [number, setNumber] = useState("");
  const [warningNumber, setWarningNumber] = useState("");
  const [info, setInfo] = useState("");
  const [warningInfo, setWarningInfo] = useState("");

  function IsNumeric(str: string) {
    return str.length === 1 && (parseInt(str) < 10 || str === "-" || str === "+");
  }

  function IsNumerics(str: string) {
    let is: boolean;
    is = true
    if (str.length < 1) {
      is = false
      return is
    }
    for (let i = 0; i < str.length; i++) {
      if (!(parseInt(str[i]) < 10 || str[i] === "-" || str[i] === "+")) {
        is = false
      } else if (!is) {
        return is
      }
    }
    return is
  }

  function IsShowButton() {
    if (
      (firstName !== "" && firstName.length < 60)
      && (lastName !== "" && lastName.length < 60)
      && (postalCod !== "" && postalCod.length < 7 && IsNumerics(postalCod))
      && (city !== "" && city.length < 60)
      && (number !== "" && number.length < 15 && IsNumerics(number))
    ) {
      return true;
    } else {
          return false;
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    NewOrderRequest(selectedValue, selectedValuePayment, firstName, lastName, postalCod, address, city, number, info )
      .then(result => {
        if (result.status == 200) {
                  setSum(result.sum);
          history.push(AppRoutes.payment.path);
        } else {
          console.error("Order is wrong" + result.errorText);
          setError(result.errorText);
        }})
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 60) {
      setWarningName("The name was entered incorrectly");
    } else {
      setFirstName(event.target.value);
      setWarningName("")
    }
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.value.length > 60) {

      setWarningLastName("The last name was entered incorrectly");
    } else {
      setLastName(event.target.value)
      setWarningLastName("")
    }
  };
  const handlePostCodeChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (!IsNumeric(event.target.value.slice(-1)) || event.target.value.length > 5 ) {

      setWarningPostCode("The postcode was entered incorrectly");
    } else {
      setPostalCod(event.target.value);
      setWarningPostCode("")
    }
  };
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 60) {
      setWarningAddress("The address was entered incorrectly");
    } else {
      setAddress(event.target.value);
      setWarningAddress("")
    }
  };
  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.value.length > 60) {

      setWarningCity("The city was entered incorrectly");
    } else {
      setCity(event.target.value);
      setWarningCity("")
    }
  };
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (!IsNumeric(event.target.value.slice(-1)) || event.target.value.length > 13) {
      setWarningNumber("The phone number was entered incorrectly");
    } else {
      setNumber(event.target.value);
      setWarningNumber("")
    }
  };
  const handleInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 60) {
      setWarningInfo("The info was entered incorrectly")

    } else {
      setInfo(event.target.value);
      setWarningInfo("")
    }

  };

  const handleClickOpenPPL = () => {
    setOpenPPL(true);
  };

  const handleClosePPL = () => {
    setOpenPPL(false);
  };

  const handleClickOpenDPH = () => {
    setOpenDPH(true);
  };

  const handleCloseDPH = () => {
    setOpenDPH(false);
  };

  const handleClickOpenTA = () => {
    setOpenTA(true);
  };

  const handleCloseTA = () => {
    setOpenTA(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValuePayment(event.target.value);
  };

  useEffect(() => {
  }, []);


    return (
      <Container>
        <Grid
          xs={12}
          container
          spacing={3}
          direction="row"
          justify="flex-end"
          alignItems="stretch"
        >
          <Grid item xs={8}>
            <Grid
              container
              spacing={3}
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Paper className={classes.parerProp}>
                <Grid item
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                >
                  <Grid item>
                    <Avatar className={classes.avatarItem}>1</Avatar></Grid>
                  <Grid item className={classes.personal}>
                    <Typography variant="h5">Thanks for your details</Typography>
                    <Grid >
                      <Person/></Grid>
                  </Grid>

                </Grid>

              </Paper>
              <Paper className={classes.parerProp}>
                <Grid item
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                >
                  <Grid item>
                    <Avatar className={classes.avatarItem}>2</Avatar></Grid>
                  <Grid item>
                    <Typography variant="h5">Where would you like your order to be delivered?</Typography>
                    <Typography variant="caption">Shipping is only available in the UK</Typography>
                  </Grid>
                </Grid>
                <Grid item
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                </Grid>
                <Container maxWidth="md">
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="stretch"
                    >
                      <Grid item xs={6}>
                        <Typography variant="h6">Shipping info</Typography>
                        <TextField
                          onChange={handleFirstNameChange}
                          id="firstName"
                          name="First name"
                          label="First name"
                          autoComplete="First name"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={firstName}
                        />
                        <Typography variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningName}</Typography>
                        <TextField
                          onChange={handleLastNameChange}
                          id="LastName"
                          name="Last name"
                          label="Last name"
                          autoComplete="Last name"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={lastName}
                        />
                        <Typography variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningLastName}</Typography>
                        <TextField
                          onChange={handlePostCodeChange}
                          id="postalCode"
                          name="Postal cod"
                          label="Postal cod"
                          autoComplete="postal-code"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={postalCod}
                        />
                        <Typography  id="postalCodeError" variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningPostCode}</Typography>
                        <TextField
                          onChange={handleAddressChange}
                          id="adress"
                          name="Address"
                          label="Address"
                          autoComplete="address-level2"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={address}
                        />
                        <Typography variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningAddress}</Typography>
                        <TextField
                          onChange={handleCityChange}
                          id="city"
                          name="City"
                          label="City"
                          autoComplete="street-address"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={city}
                        />
                        <Typography variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningCity}</Typography>
                        <TextField
                          onChange={handleNumberChange}
                          id="number"
                          name="Contact number"
                          label="Contact number"
                          autoComplete="tel"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={number}
                        />
                        <Typography id="numberError" variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningNumber}</Typography>
                        <TextField
                          onChange={handleInfoChange}
                          id="info"
                          name="Additional info"
                          label="Additional info"
                          autoComplete="additional info"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          value={info}
                        />
                        <Typography variant="caption" display="block"
                                    style={{color: "#fa0303"}}>{warningInfo}</Typography>
                      </Grid>
                      <Grid item xs={5}
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center">

                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="stretch"
                              style={{marginLeft: 24}}
                        >
                          <Typography variant="h6">Payment method</Typography>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="dph"
                              checked={selectedValue === "DPH"}
                              onChange={handleChange}
                              value="DPH"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>DPH </Typography></div>
                            <div style={{marginTop: 16, marginLeft: 53, alignItems: "center"}}>
                              <Typography onClick={handleClickOpenDPH} style={{textDecoration: "underline"}}>
                                more info</Typography>
                              <Dialog
                                open={openDPH}
                                onClose={handleCloseDPH}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Where our next working day delivery service has been selected we aim to dispatch
                                    your
                                    goods from our warehouse within 1 working days of you placing your order (excluding
                                    weekends and UK public holidays). For next day delivery (via Yodel) you need to
                                    place
                                    your order before 4.00pm Monday-Friday, and before 3.00pm on Sunday. Orders placed
                                    after 4.00pm on Friday, anytime Saturday or Sunday (before 3.00pm) will arrive on
                                    Monday. Orders placed on a UK public holiday will be shipped on the next working
                                    day.
                                    We will send you an email confirming when we have dispatched your order.
                                    Please note that we can't accept orders billed to or addressed to PO Boxes.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseDPH} color="primary">
                                    OK
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </Grid>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="ppl"
                              checked={selectedValue === "PPL"}
                              onChange={handleChange}
                              value="PPL"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>PPL </Typography></div>
                            <div style={{marginTop: 16, marginLeft: 53, alignItems: "center"}}>
                              <Typography onClick={handleClickOpenPPL} style={{textDecoration: "underline"}}>
                                more info</Typography>
                              <Dialog
                                open={openPPL}
                                onClose={handleClosePPL}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Where our next working day delivery service has been selected we aim to dispatch
                                    your
                                    goods from our warehouse within 1 working days of you placing your order (excluding
                                    weekends and UK public holidays). For next day delivery (via Yodel) you need to
                                    place
                                    your order before 4.00pm Monday-Friday, and before 3.00pm on Sunday. Orders placed
                                    after 4.00pm on Friday, anytime Saturday or Sunday (before 3.00pm) will arrive on
                                    Monday.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClosePPL} color="primary">
                                    OK
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>

                          </Grid>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="takeAway"
                              checked={selectedValue === "Take Away"}
                              onChange={handleChange}
                              value="Take Away"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>Take away </Typography></div>
                            <div style={{marginTop: 16, marginLeft: 16, alignItems: "center"}}>
                              <Typography onClick={handleClickOpenTA} style={{textDecoration: "underline"}}>
                                more info</Typography>
                              <Dialog
                                open={openTA}
                                onClose={handleCloseTA}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    We are open 7 days a week. Monday to Saturday we are open from 9 am for brunch,
                                    coffee
                                    and lunch.
                                    From Wednesday to Saturday the restaurant opens its doors in the evenings from 5pm -
                                    10pm.
                                    On Sunday we serve coffee and cake from 10am and Sunday Lunch from 12pm.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseTA} color="primary">
                                    OK
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="stretch"
                              style={{marginLeft: 24}}
                        >
                          <Typography variant="h6">Shipping method</Typography>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="PayPal"
                              checked={selectedValuePayment === "PayPal"}
                              onChange={handleChangePayment}
                              value="PayPal"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>PayPal Express Checkout</Typography></div>
                          </Grid>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="CreditCard"
                              checked={selectedValuePayment === "CreditCard"}
                              onChange={handleChangePayment}
                              value="CreditCard"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>Secure Credit Card & Debit Card </Typography></div>

                          </Grid>
                          <Grid item container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch">
                            <MyRadio
                              id="cash"
                              checked={selectedValuePayment === "Cash"}
                              onChange={handleChangePayment}
                              value="Cash"
                              name="radio-button-demo"
                              style={{margin: 8}}
                            />
                            <div style={{margin: 8, marginTop: 16}}>
                              <Typography>Cash</Typography></div>
                          </Grid>
                        </Grid>
                        <Grid>
                          {IsShowButton() ? <Button
                            id="submit"
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{marginBottom: 16}}
                          >
                            CONTINUE TO PAYMENT
                          </Button> : <Button
                            id="btnPay"
                            disabled
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{marginBottom: 16}}
                          >
                            CONTINUE TO PAYMENT
                          </Button>}
                        </Grid>
                      </Grid>
                    </Grid>

                  </form>
                </Container>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <OrderSummary delivery={selectedValue} payment={selectedValuePayment}/>
          </Grid>
        </Grid>
      </Container>
    );
};