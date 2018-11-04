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

import logo from "./logo.png";

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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

function NavDrawer({ autoHide, classes, onClick, onClose, open }) {
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
        {/* <h3 onClick={() => onClick(PAGES[0])} className={classes.logo}>
          Hadith House
        </h3> */}
      </div>
      <Divider />
      <List>
        {PAGES.map(page => (
          <ListItem button key={page.title} onClick={() => onClick(page)}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
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

const comp = withStyles(styles)(NavDrawer);
export { comp as NavDrawer };
