import React from "react";
import PropTypes from "prop-types";
import { TopBar } from "./TopBar";
import { NavDrawer } from "./NavDrawer";
import { Router } from "./Router";
import { Hidden } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class LayoutContent extends React.Component {
  static propTypes = {
    changeLanguage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired, // Set by withStyles()
    closeNavDrawer: PropTypes.func.isRequired,
    dir: PropTypes.string.isRequired,
    isNavDrawerOpen: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired, // Set by withRouter()
    onNavItemClicked: PropTypes.func.isRequired,
    openNavDrawer: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired, // Set by withNamespaces()
    theme: PropTypes.object.isRequired // Set by withStyles()
  };

  render() {
    const {
      changeLanguage,
      classes,
      closeNavDrawer,
      dir,
      isNavDrawerOpen,
      location,
      onNavItemClicked,
      openNavDrawer,
      t
    } = this.props;

    const appTitle = t("App.Title");

    return (
      <div dir={dir}>
        <div className={classes.root}>
          <TopBar
            open={isNavDrawerOpen}
            onDrawerClicked={openNavDrawer}
            title={appTitle}
            changeLanguage={changeLanguage}
          />
          <Hidden smUp implementation="css">
            <NavDrawer
              autoHide={true}
              open={isNavDrawerOpen}
              onClose={closeNavDrawer}
              onClick={onNavItemClicked}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <NavDrawer
              autoHide={false}
              open={true}
              onClick={onNavItemClicked}
            />
          </Hidden>
          <main className={classes.content}>
            <div className={classes.drawerHeader} />
            <Router location={location} />
          </main>
        </div>
      </div>
    );
  }
}

const WrappedLayoutContent = withNamespaces()(
  withStyles(styles, { withTheme: true })(withRouter(LayoutContent))
);

export default WrappedLayoutContent;
