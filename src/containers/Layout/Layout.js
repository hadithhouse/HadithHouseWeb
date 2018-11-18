import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import LayoutContent from "./components/LayoutContent";
import i18n from "i18next";
import {
  ltrTheme,
  rtlTheme,
  ltrJss,
  rtlJss,
  classNameGenerator
} from "../../theme";

class Layout extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    language: "ar",
    dir: "rtl",
    isNavDrawerOpen: false
  };

  componentDidMount = () => {
    this.changeLanguage(i18n.language);
  };

  changeLanguage = language => {
    i18n.changeLanguage(language);

    this.setState({
      language: i18n.language,
      dir: i18n.dir()
    });
  };

  openNavDrawer = () => {
    this.setState({
      isNavDrawerOpen: true
    });
  };

  closeNavDrawer = () => {
    this.setState({
      isNavDrawerOpen: false
    });
  };

  onNavItemClicked = page => {
    const { history } = this.props;
    history.push(page.path);
    this.closeNavDrawer();
  };

  render() {
    const { dir, isNavDrawerOpen } = this.state;

    const [theme, jss] =
      dir === "rtl" ? [rtlTheme, rtlJss] : [ltrTheme, ltrJss];

    return (
      <div dir={dir}>
        <CssBaseline />
        <MuiThemeProvider key={dir} theme={theme}>
          <JssProvider jss={jss} generateClassName={classNameGenerator}>
            <LayoutContent
              changeLanguage={this.changeLanguage}
              closeNavDrawer={this.closeNavDrawer}
              dir={dir}
              isNavDrawerOpen={isNavDrawerOpen}
              openNavDrawer={this.openNavDrawer}
              onNavItemClicked={this.onNavItemClicked}
            />
          </JssProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Layout;
