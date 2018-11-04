import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PAGES } from "../pages";

export class Router extends React.Component {
  render() {
    return (
      <Switch>
        {PAGES.map(page => {
          return (
            <Route
              key={page.title}
              path={page.path}
              exact={true}
              component={page.component}
            />
          );
        })}
        <Route render={this.invalidPageUrl} />
        <Redirect to="/" />
      </Switch>
    );
  }

  invalidPageUrl() {
    return <div>Invalid page URL.</div>;
  }
}
