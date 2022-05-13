import React, {useEffect, useMemo, useState} from "react";
import {BrowserRouter} from 'react-router-dom';

import {CssBaseline, MuiThemeProvider} from "@material-ui/core";

import {Main} from "./components/Main";
import myTheme from "./styles/theme.js";
import {UserContext} from "./context/UserContext";
import {CountContext} from "./context/CountContext";
import {AdminContext} from "./context/AdminContext";
import {cookies} from "./components/login/SingUp";


export const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(cookies.get("sessionId"));
  const [admin, setAdmin] = useState<string | null>(cookies.get("adminId"));
  const providerUser = useMemo(() => ({user, setUser}), [user, setUser])
  const providerAdmin = useMemo(() => ({admin, setAdmin}), [admin, setAdmin])
  const [count, setCount] = useState<number>(0);
  const providerCount = useMemo(() => ({count, setCount}), [count, setCount])

  useEffect(() => {
    let cart: any;
    if (window.localStorage.getItem("cart") != null) {
      let countGood = 0
      cart = JSON.parse(window.localStorage.getItem("cart")!!)
      for (const [key, value] of Object.entries<number>(cart)) {
        if(key!=null){}
        countGood += value;
      }
      setCount(countGood);
    }
  }, []);

  return (
    <UserContext.Provider value={providerUser}>
      <AdminContext.Provider value={providerAdmin}>
        <CountContext.Provider value={providerCount}>
          <BrowserRouter>
            <MuiThemeProvider theme={myTheme}>
              <CssBaseline>
                <Main/>
              </CssBaseline>
            </MuiThemeProvider>
          </BrowserRouter>
        </CountContext.Provider>
      </AdminContext.Provider>
    </UserContext.Provider>
  );
};
