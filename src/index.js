import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "typeface-roboto";
import * as serviceWorker from "./serviceWorker";
import { Layout } from "./containers/Layout/";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n";

ReactDOM.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Layout />
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
