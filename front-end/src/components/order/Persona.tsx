import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import {IPersonalRequest, personalRequest} from "../../userEffects/personalDataRequest";

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

export const myPersonRequest = (user: string) => {
  const iPersonRequest = personalRequest(new class implements IPersonalRequest {
    sessionId = user;
  });
  return iPersonRequest;
};


export const Person = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [surname, setSurname] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const {user} = useContext(UserContext);

  useEffect(() => {
    myPersonRequest(user)
      .then(result => {
        if (result.status === 200) {
          setName(result.name);
          setSurname(result.surname);
          setEmail(result.email)
        } else {
          console.error("Sign in is wrong" + result.errorText);
          setError(result.errorText);
        }
      });

  }, [])

  if (error === undefined) {
    return (
      <>
        <Typography> {name} {surname}</Typography>
        <Typography> {email}</Typography>
      </>
    );
  } else {
    return (
             <Typography variant="caption" display="block"
                    style={{color: "#fa0303"}}>{error}</Typography>
    );
  }

};