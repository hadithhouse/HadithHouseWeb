import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { create } from "jss";
import rtl from "jss-rtl";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

function getTheme(uiTheme) {
  const theme = createMuiTheme({
    direction: uiTheme.direction,
    nprogress: {
      color: uiTheme.paletteType === "light" ? "#000" : "#fff"
    },
    palette: { ...uiTheme.paletteColors, type: uiTheme.paletteType },
    typography: {
      // Use typography V2 as the old one is deprecated:
      // https://material-ui.com/style/typography/#strategies
      useNextVariants: true
    }
  });

  return theme;
}

const theme = getTheme({
  direction: "rtl",
  paletteType: "light",
  paletteColors: {
    primary: blue,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08)
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <App />
        </JssProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
