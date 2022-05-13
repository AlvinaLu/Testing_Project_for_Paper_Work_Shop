import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react';
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper, TextField,
  Typography
} from "@material-ui/core";

import {useHistory} from "react-router-dom";
import {AdminContext} from "../../context/AdminContext";
import {AppRoutes} from "../AppRoutes";
import {IGood} from "./Goods";
import {editGoodsRequest, IEditGoodRequest} from "../../userEffects/EditGoodRequest";
import {UserContext} from "../../context/UserContext";


const useStyles = makeStyles((theme) => ({
  container: {
    background: "#ffffff",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
    padding: 24,
    height: "100%",
  },
  grid: {
    margin: 16,
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
    margin: 48,
    wight: "300px",
    color: "#fcb500"
  },
  textColor: {
    color: "#959494",
  },
}));

export interface IEditGoodProps {
  good: IGood;
}

export const editGood = (id: number, name: string, amount: number, description: string,  user: string, admin: string) => {
  const iEditGoodRequest = editGoodsRequest(new class implements IEditGoodRequest{
    adminId = admin;
    sessionId = user;
    id = id;
    name = name;
    amount = amount;
    description = description;
  });
  return iEditGoodRequest;
};


export const EditGoodPage = ({good}: IEditGoodProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [warning, setWarning] = useState<string>("");
  const [name, setName] = useState(good.name);
  const [description, setDescription] = useState(good.description);
  const [amount, setAmount] = useState<number>(good.amount);
  const {admin} = useContext(AdminContext);
  const {user} = useContext(UserContext);

  const isAdmin = !(admin === null || admin === undefined);
  const history = useHistory();

  const classes = useStyles();
  useEffect(() => {

  }, []);

  function isNumeric(str: string) {
    return str.length === 1 && (parseInt(str) < 10 || str === "-" || str === "+");
  }

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(event.target.value.slice(-1))) {
      setWarning("The amount was entered incorrectly")
    } else {
      setAmount(parseInt(event.target.value));
      setWarning("")
    }

  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        editGood(good.id, name,  amount, description,  user, admin)
      .then(result => {
        if (result.status === 200) {
                 } else {
          console.error(result.errorText);
          setError(result.errorText);
        }
      },error => {
        console.error("Unknown error");
      });
  }

  if (!isAdmin) {
    return (
      <>{history.push(AppRoutes.home.path)}</>
    );
  } else {
    return (
      <Container className={classes.container}>
        <form onSubmit={handleSubmit}>
          <Grid
            className={classes.grid}
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Typography variant="h3" className={classes.name}>{name}</Typography>
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              multiline
              rows={1}
              value={name}
              onChange={handleChangeName}
              variant="outlined"
            />
          </Grid>


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
              <Grid
                className={classes.grid}
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Typography variant="h6" className={classes.name}>Amount: {amount}</Typography>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Amount"
                  multiline
                  rows={1}
                  value={amount}
                  onChange={handleChangeAmount}
                  variant="outlined"
                />
                <Typography variant="caption" display="block"
                            style={{color: "#fa0303"}}>{warning}</Typography>
              </Grid>


              <Grid item xs={12}>
                <Grid
                  className={classes.grid}
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                >
                  <Typography variant="h6" className={classes.name}>{description}</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    variant="outlined"
                    onChange={handleChangeDescription}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button

              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Save
            </Button>
          </Grid>
        </form>


      </Container>
    );
  }
};









