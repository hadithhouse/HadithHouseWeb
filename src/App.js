import React, { Component } from "react";
import { CssBaseline } from "@material-ui/core";
import { Layout } from "./containers/Layout";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout />
      </React.Fragment>
    );
  }
}

export default App;
