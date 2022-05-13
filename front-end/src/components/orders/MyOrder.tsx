import React, { useState} from 'react';
import {
  Container,
  Grid, IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {IOrders} from "./Orders";
import {OrderCard} from "./OrderCard";


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
    justify: "center",
    alignItems: "center"
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
  delBox: {
    marginLeft: 100,
  },
  textColor: {
    color: theme.palette.secondary.dark,
  },
  total: {
    marginBottom: 24,
  },

}));

export interface IPropsToOrder {
  order: IOrders;
}

export const MyOrder = ({order}: IPropsToOrder) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleClickOpen() {
    setOpen(!open);
  }

  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center">

        <Grid item>
          <Typography variant="h5" component="h5" className={classes.textColor}> YOU ORDER </Typography>
          <Typography variant="h5" component="h5"> {order.id}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h5" className={classes.textColor}>DATE</Typography>
          <Typography variant="h5" component="h5">{order.date}</Typography>
        </Grid>

        <Grid item className={classes.gridItem}>
          <Typography component="h5" variant="h5" className={classes.textColor}>STATUS </Typography>
          <Typography component="h5" variant="h5" >{order.status}</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center">

        <Grid item style={{marginRight: 80}}>
          <IconButton onClick={handleClickOpen}>
            {open?   <ArrowDropUpIcon fontSize="large" className={classes.button}/> : <ArrowDropDownIcon fontSize="large" className={classes.button}/>}

          </IconButton>
        </Grid>
      </Grid>
      {open ? <Container maxWidth="md">
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch">

            <Grid item>
              {order.cart.map((item) => {
                  return (
                    <Grid item key={item.id}>
                      <OrderCard good={item}/>
                    </Grid>
                  );
                }
              )}
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center">
            <Typography variant="h5" className={classes.total}>TOTAL:  GBR {(order.totalSum).toFixed(2)}</Typography>
            <Typography variant="h5" className={classes.total}>     Delivery: {order.deliveryCompany}</Typography>
          </Grid>
        </Container>
         : <></>}
    </Paper>
  );

};