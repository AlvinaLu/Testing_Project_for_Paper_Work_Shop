import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {Box, Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {AppRoutes} from "../AppRoutes";
import {IUserAuthRequest, signIn} from "../../userEffects/signIn";
import {cookies, expiredTime, hashPassword} from "./SingUp";
import {AdminContext} from "../../context/AdminContext";

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

export const signInUser = (email:string, password:string) => {
  const iUserAuthRequest = signIn(new class implements IUserAuthRequest {
    email= email;
    password = password;
  });
  return iUserAuthRequest;
};

export const SignIn = () => {
  const {user, setUser} = useContext(UserContext);
  const {admin, setAdmin} = useContext(AdminContext);

  const [error, setError] = useState<string | undefined>(undefined);
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const cookiesExpired = () => {
    const expired: number = (expiredTime*1000);
    setTimeout (()=>setUser(null),expired);
    setTimeout (()=>setAdmin(null),expired);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInUser(email, hashPassword(password))
      .then(result => {
        if (result.status === 200) {
         setUser(result.sessionId);
          cookies.set("sessionId", result.sessionId, {path: "/", maxAge:3600});
          setAdmin(result.adminId);
          cookies.set("adminId", result.adminId, {path: "/", maxAge:3600});
          history.push(AppRoutes.home.path);
          cookiesExpired();
        } else {
          console.error("Sign in is wrong" + result.errorText);
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
          </Box>
          <TextField
            id="loginText"
            name="email"
            label="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            id="passwordText"
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
          <Button
            id="btnSubmitLogin"
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