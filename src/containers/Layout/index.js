import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { NavDrawer } from "./components/NavDrawer";
import {
  closeNavDrawer,
  openNavDrawer,
  openLanguageMenu,
  closeLanguageMenu,
  toggleLanguageMenu
} from "./actions";
import { connect } from "react-redux";
import layoutReducer from "./reducer";
import { Router } from "./components/Router";
import { Hidden, CssBaseline } from "@material-ui/core";
import { withNamespaces } from "react-i18next";
import { i18n } from "../../i18n";
import { MuiThemeProvider } from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import {
  ltrTheme,
  rtlTheme,
  ltrJss,
  rtlJss,
  classNameGenerator
} from "../../theme";

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
  state = {
    language: i18n.language,
    dir: i18n.dir()
  };

  onNavItemClicked = page => {
    const { history, closeNavDrawer } = this.props;
    history.push(page.path);
    closeNavDrawer();
  };

  changeLanguage = language => {
    i18n.changeLanguage(language);

    this.setState({
      language: i18n.language,
      dir: i18n.dir()
    });
  };

  render() {
    const {
      classes,
      openNavDrawer,
      closeNavDrawer,
      closeLanguageMenu,
      toggleLanguageMenu,
      layout,
      location,
      t
    } = this.props;

    const [theme, jss, generateClassName] =
      this.state.dir === "rtl"
        ? [rtlTheme, rtlJss, classNameGenerator]
        : [ltrTheme, ltrJss, classNameGenerator];

    const appTitle = t("app_title");

    return (
      <div dir={this.state.dir}>
        <CssBaseline />
        <MuiThemeProvider key={this.state.dir} theme={theme}>
          <JssProvider jss={jss} generateClassName={generateClassName}>
            <div className={classes.root}>
              <TopBar
                open={layout.isNavDrawerOpen}
                onDrawerClicked={openNavDrawer}
                title={appTitle}
                languageMenuOpen={layout.isLanguageMenuOpen}
                changeLanguage={this.changeLanguage}
                toggleLanguageMenu={toggleLanguageMenu}
                closeLanguageMenu={closeLanguageMenu}
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
                <Router location={location} />
              </main>
            </div>
          </JssProvider>
        </MuiThemeProvider>
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
    closeNavDrawer: () => dispatch(closeNavDrawer()),
    openLanguageMenu: () => dispatch(openLanguageMenu()),
    closeLanguageMenu: () => dispatch(closeLanguageMenu()),
    toggleLanguageMenu: () => dispatch(toggleLanguageMenu())
  };
}

function mapStateToProps(state) {
  return { layout: state.layout };
}

const comp = withNamespaces()(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Layout)
    )
  )
);
export { comp as Layout, layoutReducer };
