import React, {useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import {AppRoutes} from "../AppRoutes";
import {IUserSignOutRequest, signOut} from "../../userEffects/signOut";
import {cookies} from "./SingUp";
import {CircularProgress} from "@material-ui/core";
import {AdminContext} from "../../context/AdminContext";


export const signOutUser = (user: string) => {
  const iUserAuthRequest = signOut(new class implements IUserSignOutRequest {
    sessionId = user;
  });
  return iUserAuthRequest;
};

export const SignOut = () => {
  const {user, setUser} = useContext(UserContext);
  const {admin, setAdmin} = useContext(AdminContext);

  const history = useHistory();

  useEffect(() => {
    signOutUser(user)
      .then(() => {
        setUser(null);
        setAdmin(null);
        cookies.set("sessionId", null);
        cookies.set("adminId", null);
        history.push(AppRoutes.signIn.path);
      }, error =>{
        console.error("Unknown error");
      });
  }, []);

  return <div> <CircularProgress/> </div>;
};
