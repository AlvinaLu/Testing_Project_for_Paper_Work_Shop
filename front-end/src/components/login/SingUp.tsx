import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Box, Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {AppRoutes} from "../AppRoutes";
import Cookies from "universal-cookie";
import {IUserRequest, IUserResponse, signUp} from "../../userEffects/signUp";
import {AdminContext} from "../../context/AdminContext";
import validator from "validator";

export const expiredTime: number = 3600;
export const cookies = new Cookies();


const useStyles = makeStyles((theme) => ({
  description: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    textAlign: "center",
    width: "100%",
  },
  cont: {
    marginTop: 80,
    border: "1px",
    borderColor: "black",
  },
  form: {
    width: "100%",
    padding: 10,
    color: theme.palette.primary.dark,
  },
  name: {
    marginRight: "5%",
    width: "45%",
  },
  surname: {
    marginLeft: "5%",
    width: "45%",
  },
  buttonSignUp: {
    width: "100%",
    marginTop: 20,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
  errorText: {
    textAlign: "center",
    color: "red",
  }

}));
export const hashPassword = (password: string) => {
  const md5 = require('md5');
  const newPassword = md5(password + 'paperworkshop');
  return newPassword;
}
export const NewUser = (name: string, surname: string, email: string, password: string) => {
  const iUserRequest = signUp(new class implements IUserRequest {
    name = name;
    surname = surname;
    email = email;
    password = password;
  });
  return iUserRequest;
};

export const SignUp = () => {
  const {user, setUser} = useContext(UserContext);
  const {admin, setAdmin} = useContext(AdminContext);
  const [error, setError] = useState<string | undefined>(undefined);
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warningPassword, setWarningPassword] = useState("");
  const [warningEmail, setWarningEmail] = useState("");
  const [warningName, setWarningName] = useState("");
  const [warningSurname, setWarningSurname] = useState("");


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length < 2 || event.target.value.length >60){
      setWarningName("The name was entered incorrectly")
    } else {
      setName(event.target.value);
      setWarningName("")
    }
  };

  const handleSurnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length < 2 || event.target.value.length >60){
      setWarningSurname("The surname was entered incorrectly")
    } else {
      setSurname(event.target.value);
      setWarningSurname("")
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validator.isEmail(event.target.value)) {
      setWarningEmail("");
      setEmail(event.target.value);
    } else {
      setWarningEmail('Enter valid email');
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 8) {
      setWarningPassword("Password must be at least 8 characters")
    } else {
      setPassword(event.target.value);
      setWarningPassword("")
    }
  };

  const cookiesExpired = () => {
    const expired: number = (expiredTime * 1000);
    setTimeout(() => setUser(null), expired);
    setTimeout(() => setAdmin(null), expired);
  }


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    NewUser(name, surname, email, hashPassword(password))
      .then(result => {
        if (result.status === 200) {
          setUser(result.sessionId);
          cookies.set("sessionId", result.sessionId, {path: "/", maxAge: expiredTime});
          cookies.set("adminId", result.adminId, {path: "/", maxAge: expiredTime});
          history.push(AppRoutes.cart.path);
          cookiesExpired();
        } else {
          console.error("Auth is wrong" + result.errorText);
          setError(result.errorText);
        }
      });
  };

  return (
    <Container className={classes.cont}>
      <Typography variant="h4" className={classes.typography}>
      </Typography>
      <Typography variant="h6" className={classes.typography}>
      </Typography>
      <Container maxWidth="xs" className={classes.description}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Box>
            <TextField
              className={classes.name}
              name="First name"
              label="First name"
              autoComplete="First name"
              onChange={handleNameChange}
              variant="outlined"
              required
              margin="normal"
              autoFocus
            />

            <TextField
              className={classes.surname}
              name="Last name"
              label="Last name"
              autoComplete="Last name"
              onChange={handleSurnameChange}
              variant="outlined"
              required
              margin="normal"
            />
            <Box><Typography variant="caption" display="block"
                          style={{color: "#fa0303"}}>{warningName}</Typography>
            <Typography variant="caption" display="block"
                        style={{color: "#fa0303"}}>{warningSurname}</Typography></Box>
          </Box>
          <TextField
            name="email"
            label="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Typography variant="caption" display="block"
                      style={{color: "#fa0303"}}>{warningEmail}</Typography>
          <TextField
            name="password"
            label="Password"
            autoComplete="current-password"
            type="password"
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Typography variant="caption" display="block"
                      style={{color: "#fa0303"}}>{warningPassword}</Typography>
          <Button
            className={classes.buttonSignUp}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        {error===undefined? <></> :<Typography variant="caption" display="block"
                    style={{color: "#fa0303"}}>{error}</Typography>}
      </Container>
    </Container>
  );
};