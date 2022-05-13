import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#2c88b3",
      main: "#2c88b3",
      dark: "#2c88b3",
    },
    secondary: {
      light: "#2c88b3",
      main: "#2c88b3",
      dark: "#2c88b3",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat"
    ],
  },
});

export default responsiveFontSizes(myTheme);