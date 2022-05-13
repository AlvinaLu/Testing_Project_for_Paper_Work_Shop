import React, {useContext} from "react";
import {generatePath, Link} from "react-router-dom";
import { Box, Button, makeStyles, Toolbar} from '@material-ui/core';
import {Logo} from "./Logo";
import {AppRoutes} from "./AppRoutes";
import {UserContext} from "../context/UserContext";
import {CartButton} from "./cart/CartButton";
import {AppRoute} from "./AppRoutes";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import {AdminContext} from "../context/AdminContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  menuButton: {
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(2),
    borderColor: theme.palette.primary.dark,
  },
  registerButton: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(2),
  },
  cartButton: {
    color: theme.palette.primary.dark,
  }
}));

export const Navigation = () => {
  const {user} = useContext(UserContext);
  const {admin} = useContext(AdminContext);
  const classes = useStyles();


  const isUserSignedIn = !((user === null) || (user===undefined));
  const isAdmin = admin!==undefined && admin!==null;

  function renderSwitch(route: AppRoute){
    if(route.name==="Register"){
      return (<Button
        className={classes.registerButton}
        key={route.name}
        to={route.path}
        component={Link}
        size="large"
        variant="contained"
      >{route.name}</Button>);
    }else if(route.name==="cart"){
      return (<Button
      className={classes.menuButton}
      key={route.name}
      to={route.path}
      component={Link}
      size="large"
      variant="outlined"
        >
        <CartButton/>
    </Button>);
    }else if(route.name==="orders"){
    return (<Button
      className={classes.menuButton}
      key={route.name}
      to={route.path}
      component={Link}
      size="large"
      variant="outlined"
    >
     <PersonOutlineIcon/>
    </Button>);
  }else{
      return (<Button
        className={classes.menuButton}
        key={route.name}
        to={route.path}
        component={Link}
        size="large"
        variant="outlined"
      >{route.name}</Button>);
    }
  }

  return (
    <Toolbar>
      <Box className={classes.logo}>
        <Link to={generatePath("/:category", {category:1})}>
          <Logo/>
        </Link>
      </Box>
      {Object.entries(AppRoutes).map(([, route]) =>
        route.showInNavigationBar && (route.protection === "unprotected" ||(isUserSignedIn && route.protection === "requiresAuth") || (!isUserSignedIn && route.protection === "onlyWithoutAuth") || (isAdmin && route.protection === "onlyAdmin")) &&
        (<>{renderSwitch(route)}</>)
      )}
    </Toolbar>
  );
};