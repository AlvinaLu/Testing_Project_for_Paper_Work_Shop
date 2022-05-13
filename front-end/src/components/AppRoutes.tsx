import React, {useContext} from "react";
import {Route, RouteProps, Switch} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {SignUp} from "./login/SingUp";
import {MyCart} from "./cart/MyCart";
import {SignIn} from "./login/SignIn";
import {SignOut} from "./login/SignOut";
import {Categories} from "./Categories";
import {GoodPage} from "./goods/GoodPage";
import {NotFound} from "./NotFound";
import {Home} from "./Home";
import {Order} from "./order/Order";
import {Payment} from "./payment/Payment";
import {Orders} from "./orders/Orders";
import {AdminContext} from "../context/AdminContext";
import {ClientOrders} from "./clientOrders/ClientOrders";

type AppRouteProtection = "unprotected" | "requiresAuth" | "onlyWithoutAuth" | "onlyAdmin";

export interface AppRoute extends RouteProps {
  name: string,
  path: string,
  showInNavigationBar: boolean,
  protection: AppRouteProtection,
  contained?: boolean,
}

type AppRouteIndex =
  "home"
  | "cart"
  | "orders"
  | "payment"
  | "order"
  | "signUp"
  | "signIn"
  | "signOut"
  | "category"
  | "good"
  | "notFound"
  | "clientOrders";

type AppRoutes = {
  [name in AppRouteIndex]: AppRoute;
};

export const AppRoutes: AppRoutes = {
    home: {
      name: "home",
      path: "/",
      component: Home,
      showInNavigationBar: false,
      protection: "unprotected",
      exact: true,
    },
    cart: {
      name: "cart",
      path: "/cart",
      component: MyCart,
      showInNavigationBar: true,
      protection: "unprotected",
      exact: true,
    },
    order: {
      name: "order",
      path: "/order",
      component: Order,
      showInNavigationBar: false,
      protection: "requiresAuth",
      exact: true,
    },
  payment: {
    name: "payment",
    path: "/payment",
    component: Payment,
    showInNavigationBar: false,
    protection: "requiresAuth",
    exact: true,
  },
  orders: {
    name: "orders",
    path: "/orders",
    component: Orders,
    showInNavigationBar: true,
    protection: "requiresAuth",
    exact: true,
  },
  clientOrders: {
    name: "client Orders",
    path: "/client-orders",
    component: ClientOrders,
    showInNavigationBar: true,
    protection: "onlyAdmin",
    exact: true,
  },
  signIn: {
    name: "Log In",
    path: "/sign-in",
    component: SignIn,
    showInNavigationBar: true,
    protection: "onlyWithoutAuth",
    exact: true,
  },
  signUp: {
    name: "Register",
    path: "/sign-up",
    component: SignUp,
    showInNavigationBar: true,
    protection: "onlyWithoutAuth",
    exact: true,
  },
  signOut: {
    name: "Log Out",
    path: "/sign-out",
    component: SignOut,
    showInNavigationBar: true,
    protection: "requiresAuth",
    exact: true,
  },
  category: {
    name: "categories",
    path: "/:id",
    component: Categories,
    showInNavigationBar: false,
    protection: "unprotected",
    exact: true,
  },
  good: {
    name: "good",
    path: "/:category/:id",
    component: GoodPage,
    showInNavigationBar: false,
    protection: "unprotected",
    exact: true,
  },
  notFound: {
    name: "Not found",
    path: "*",
    component: NotFound,
    showInNavigationBar: false,
    protection: "unprotected",
    exact: false,
  },

  };

export const AppRoutesComponent = () => {
  const {user} = useContext(UserContext);
  const {admin} = useContext(AdminContext);

  const isUserSignedIn = !((user === null) || (user === undefined));
  const isAdmin = !(admin === null || admin === undefined);


  return (
    <Switch>
      {Object.entries(AppRoutes).map(([, route]) =>
        (route.protection === "unprotected" ||
          (isUserSignedIn && route.protection === "requiresAuth") || (!isUserSignedIn && route.protection === "onlyWithoutAuth") || (isAdmin && route.protection === "onlyAdmin")) &&
        <Route key={route.name} path={route.path} exact={route.exact} component={route.component}/>
      )}
    </Switch>
  );
};
