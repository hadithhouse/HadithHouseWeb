import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { PAGES } from "../pages";
import { withNamespaces } from "react-i18next";
// import { withI18n } from "react-i18next";

import logo from "./logo.png";

export const DRAWER_WIDTH = 240;

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    ...theme.mixins.toolbar
  },
  logo: {
    width: "100%",
    cursor: "pointer"
  }
});

function NavDrawer({ autoHide, classes, onClick, onClose, open, t }) {
  return (
    <Drawer
      className={classes.drawer}
      variant={autoHide ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <img
          alt=""
          src={logo}
          className={classes.logo}
          onClick={() => onClick(PAGES[0])}
        />
      </div>
      <Divider />
      <List>
        {PAGES.filter(page => page.showInNavDrawer).map(page => {
          const key = page.titleResourceName;
          const title = t(page.titleResourceName);
          return (
            <ListItem button key={key} onClick={() => onClick(page)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

NavDrawer.propTypes = {
  autoHide: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

const WrappedNavDrawer = withNamespaces()(
  withStyles(styles, { withTheme: true })(NavDrawer)
);
export { WrappedNavDrawer as NavDrawer };
