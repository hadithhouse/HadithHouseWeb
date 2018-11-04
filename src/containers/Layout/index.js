import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TopBar } from "./components/TopBar";
import { NavDrawer } from "./components/NavDrawer";
import { closeNavDrawer, openNavDrawer } from "./actions";
import { connect } from "react-redux";
import layoutReducer from "./reducer";
import { Router } from "./components/Router";
import { Hidden } from "@material-ui/core";

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

class Layout extends React.Component {
  onNavItemClicked = page => {
    const { history, closeNavDrawer } = this.props;
    history.push(page.path);
    closeNavDrawer();
  };

  render() {
    const { classes, openNavDrawer, closeNavDrawer, layout } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <TopBar
          open={layout.isNavDrawerOpen}
          onDrawerClicked={openNavDrawer}
          title={"Hadith House"}
        />
        <Hidden smUp implementation="css">
          <NavDrawer
            autoHide={true}
            open={layout.isNavDrawerOpen}
            onClose={closeNavDrawer}
            onClick={this.onNavItemClicked}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <NavDrawer
            autoHide={false}
            open={true}
            onClick={this.onNavItemClicked}
          />
        </Hidden>
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          <Router />
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    openNavDrawer: () => dispatch(openNavDrawer()),
    closeNavDrawer: () => dispatch(closeNavDrawer())
  };
}

function mapStateToProps(state) {
  return { layout: state.layout };
}

const reduxComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withRouter(Layout)));

const reduxCompWithStyles = withStyles(styles, { withTheme: true })(reduxComp);
export { reduxCompWithStyles as Layout, layoutReducer };
