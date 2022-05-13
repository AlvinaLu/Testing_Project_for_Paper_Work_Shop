import React, {useContext, useEffect, useState} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import {IGood} from "./Goods";
import {goodRequest, IGoodRequest} from "../../userEffects/goodRequest";
import {useParams} from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {AddGoodToCard, checkAmount} from "./GoodGard";
import {CountContext} from "../../context/CountContext";
import EditIcon from "@material-ui/icons/Edit";
import {AdminContext} from "../../context/AdminContext";
import {EditGoodPage} from "./EditGoodPage";


const useStyles = makeStyles((theme) => ({
  container: {
    background: "#ffffff",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
    padding: 24,
    height: "100%",
  },
  grid1: {
    background: "#67a194",
    textAlign: "center",
  },
  name: {
    marginBottom: 24,
  },
  text: {},
  addButton: {
    color: theme.palette.primary.dark,
  },
  button: {
    marginTop: 6,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  },
  price: {
    paddingTop: 8,
    background: "#7a8ea0",
    marginLeft: 10,
    textAlign: 'center',
  },
  description: {
    margin: 24,
    background: "#d08a64",
  },
  image: {
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    wight: 200,
  },
  warning: {
    color: "#fc0000"
  },
  paper: {
    marginLeft: 48,
    marginRight: 48,
    wight: "300px",
    color: "#fcb500"
  },
  textColor: {
    color: "#959494",
  },
}));


export const goodRequestGood = (id: number) => {
  const iGoodRequest = goodRequest(new class implements IGoodRequest {
    id = id;
  });
  return iGoodRequest;
};

export interface IParamTypesGood {
  category: string,
  id: string,
}


export const GoodPage = () => {
  const params = useParams<IParamTypesGood>();
  const [error, setError] = useState<string | undefined>(undefined);
  const [good, setGood] = useState<IGood | undefined>(undefined);
  const [countToCart, setCountToCart] = useState<number>(0);
  const [warning, setWarning] = useState<string>("");
  const goodId = parseInt(params.id);
  const {count, setCount} = useContext(CountContext);
  const [total, setTotal] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  const {admin} = useContext(AdminContext);

  const isAdmin = !(admin === null || admin === undefined);

  function handleEdit() {
    setEdit(true);
  }

  useEffect(() => {
      if (good !== undefined) {
      let tmp: number;
      tmp = checkAmount(parseInt(params.id));
      setCountToCart(tmp);
      setTotal(good.price * tmp)
         }
  }, [good])


  function handleAddGoodToCard() {
    if (good !== undefined) {
       let tmp: number;
      tmp = checkAmount(good.id);
      setCount(count + countToCart - tmp);
      AddGoodToCard({id: good.id, count: countToCart});
    }
  }

  function handleRemoveGood() {
    if (good !== undefined) {
      if (countToCart > 0) {
        setCountToCart(countToCart - 1);
        setTotal((countToCart - 1) * good.price)
        setWarning("")
      }
    }
  }

  function handleAddGood() {
    if (good !== undefined) {
      if (good.amount - countToCart >= 1) {
        setCountToCart(countToCart + 1);
        setTotal((countToCart + 1) * good.price)
      } else {
        setWarning("No more items in the store")
      }
    }
  }

  const classes = useStyles();
  useEffect(() => {
    goodRequestGood(goodId)
      .then(result => {
        if (result.status === 200) {
          setGood(result.good);
        } else {
          console.error("Good is wrong" + result.errorText);
          setError(result.errorText);
        }
      }, error => {
        console.error("Unknown error");
      });
    ;
  }, []);


  if (good === undefined && error === undefined) {
    return (
      <CircularProgress/>
    );
  } else if (edit && good !== undefined) {
    return (
      <EditGoodPage good={good}/>
    );
  } else if (good !== undefined) {
    return (
      <Container className={classes.container}>


        {isAdmin ? <Grid spacing={3}
                         container
                         direction="row"
                         justify="space-between"
                         alignItems="flex-start"
          >
            <Typography variant="h3" className={classes.name}>{good.name}</Typography><Button
            onClick={handleEdit}><EditIcon color="secondary"/></Button></Grid> :
          <Typography variant="h3" className={classes.name}>{good.name}</Typography>}

        <Grid spacing={3}
              container
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
        >
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <img src={`/${good.id}.jpg`} width="300px"></img>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Grid spacing={3}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
            >
              <Grid item>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                  <Typography variant="h5" component="h6" className={classes.textColor}>price</Typography>
                  <Typography variant="h5" component="h5">GBR {good?.price.toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item>
                    <Button className={classes.addButton} onClick={handleRemoveGood}><RemoveCircleIcon fontSize="large"
                                                                                                       color="primary"></RemoveCircleIcon></Button>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.text} variant="h5" component="h5"> {countToCart}</Typography>
                  </Grid>
                  <Grid item>
                    <Button className={classes.addButton} onClick={handleAddGood}><AddCircleIcon fontSize="large"
                                                                                                 color="primary"></AddCircleIcon></Button>
                  </Grid>
                </Grid>
                <Typography className={classes.warning} variant="caption" display="block"
                            gutterBottom>{warning}</Typography>
              </Grid>
              <Grid item>
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                  <Typography variant="h5" component="h6" className={classes.textColor}>total</Typography>
                  <Typography variant="h5" component="h5">GBR {total.toFixed(2)}</Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Button className={classes.button} variant="outlined"
                        onClick={handleAddGoodToCard}><ShoppingCartOutlinedIcon
                  className={classes.addButton}></ShoppingCartOutlinedIcon></Button>
              </Grid>

              <Grid item xs={8}>


              </Grid>
              <Grid item xs={12}>
                <div className={classes.description}>
                  <Typography style={{wordBreak: "break-all"}}>{good?.description}
                  </Typography>
                </div>
              </Grid>

            </Grid>
          </Grid>
        </Grid>


      </Container>
    );
  } else {
    return (<Container><Typography variant="caption" display="block" style={{color: "#fa0303"}}>{error}</Typography></Container>);
  }

}
;




