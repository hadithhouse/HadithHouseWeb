import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import { DRAWER_WIDTH } from "./NavDrawer";
import { Menu, MenuItem } from "@material-ui/core";

const styles = theme => ({
  appBar: {
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`
    }
  },
  drawerButton: {
    /*marginLeft: 12,
    marginRight: 12,*/
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  languageButton: {
    marginLeft: "auto",
    marginRight: 5
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 12
    }
  }
});

class TopBar extends React.Component {
  state = {
    languageMenuAnchorEl: null
  };

  handleOpenLanguageMenu = event => {
    this.setState({ languageMenuAnchorEl: event.currentTarget });
  };

  handleCloseLanguageMenu = () => {
    this.setState({ languageMenuAnchorEl: null });
  };

  render() {
    console.log("TopBar render()", this.props.theme, this.props.classes);
    const { languageMenuAnchorEl } = this.state;
    const languageMenuOpen = Boolean(languageMenuAnchorEl);

    const { classes, onDrawerClicked, title, changeLanguage } = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar disableGutters={true}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={onDrawerClicked}
            className={classes.drawerButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            noWrap
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Language"
            onClick={this.handleOpenLanguageMenu}
            className={classes.languageButton}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={languageMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={languageMenuOpen}
            onClose={this.handleCloseLanguageMenu}
          >
            <MenuItem
              onClick={() => {
                this.handleCloseLanguageMenu();
                changeLanguage("ar");
              }}
            >
              العربية
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleCloseLanguageMenu();
                changeLanguage("en");
              }}
            >
              English
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerClicked: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  changeLanguage: PropTypes.func.isRequired
};

const comp = withStyles(styles, { withTheme: true })(TopBar);
export { comp as TopBar };
