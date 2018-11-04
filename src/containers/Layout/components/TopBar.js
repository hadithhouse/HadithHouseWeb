import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  drawerButton: {
    marginLeft: 12,
    marginRight: 20
  }
});

function TopBar({ classes, onDrawerClicked, title }) {
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar disableGutters={true}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={onDrawerClicked}
          className={classNames(classes.drawerButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerClicked: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const comp = withStyles(styles, { withTheme: true })(TopBar);
export { comp as TopBar };
