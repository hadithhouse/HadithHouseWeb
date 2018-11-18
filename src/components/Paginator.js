import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { withStyles } from "@material-ui/core/styles";
import { withNamespaces } from "react-i18next";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Select, InputBase, MenuItem } from "@material-ui/core";

const styles = theme => ({
  // Styles applied to the `InputBase` component. */
  input: {
    color: "inherit",
    fontSize: "inherit",
    flexShrink: 0
  },
  // Styles applied to the caption Typography components if `variant="caption"`.
  label: {
    flexShrink: 0
  },
  // Styles for the navigation buttons, i.e. previous, next, first, and last buttons.
  navButton: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  },
  // Styles applied to the Select component `select` class. */
  select: {
    paddingLeft: 8,
    paddingRight: 16
  },
  // Styles applied to the Select component `root` class. */
  selectRoot: {
    marginRight: 32,
    marginLeft: 8
  },
  // Styles applied to the Select component `icon` class. */
  selectIcon: {
    top: 1
  },
  // Styles applied to the Toolbar component. */
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2
  },
  // Styles applied to the spacer element. */
  spacer: {
    flex: "1 1 100%"
  }
});

class Paginator extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // Set by withStyles()

    /**
     * The total number of entities the pagination is required for.
     */
    count: PropTypes.number.isRequired,

    /**
     * A function that returns a text to be displayed to indicate what entities
     * are currently displayed, e.g. 1-5 of 13. The function receives an object
     * containing the following fields: from, to, count, page, which are
     * self-explanatory. The function should return the label to display.
     */
    displayedEntitiesLabelProvider: PropTypes.func,

    /**
     * Specifies the maximum number of entities to show in a page.
     */
    entitiesPerPage: PropTypes.number.isRequired,

    /**
     * This is used to display a lable at the beginning of the paginator, something
     * like: "Entities per page:"
     */
    entitiesPerPageLabel: PropTypes.node,

    /**
     * An array of numbers for available options for the number of entities to display
     * per page, e.g. [5, 10, 20] to allow the user to select 5, 10, 20 for the number
     * of entities to display per page.
     */
    entitiesPerPageOptions: PropTypes.array,

    /**
     * A callback to be fired when the number of entities per page is changed.
     *
     * @param {object} event The event source of the callback
     */
    onChangeEntitiesPerPage: PropTypes.func.isRequired,

    onChangePage: PropTypes.func.isRequired,

    /**
     * The index of the currently selected page.
     */
    page: PropTypes.number.isRequired,

    SelectProps: PropTypes.object,

    t: PropTypes.func.isRequired, // Set by withI18n()

    theme: PropTypes.object.isRequired // Set by withStyles()
  };

  static defaultProps = {
    entitiesPerPageLabel: "Entities per page:",
    displayedEntitiesLabelProvider: ({ from, to, count }) =>
      `${from}-${to} of ${count}`,
    entitiesPerPageOptions: [10, 25, 50]
  };

  handleFirstPageButtonClick = event => {
    this.props.onChangePage(1);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(Math.max(this.props.page - 1, 1));
  };

  handleNextButtonClick = event => {
    const max = Math.ceil(this.props.count / this.props.entitiesPerPage) - 1;
    this.props.onChangePage(Math.min(this.props.page + 1, max));
  };

  handleLastPageButtonClick = event => {
    const max = Math.ceil(this.props.count / this.props.entitiesPerPage) - 1;
    this.props.onChangePage(Math.max(1, max));
  };

  handleEntitiesPerPageChange = (event, menuItem) => {
    this.props.onChangeEntitiesPerPage(menuItem.props.value);
  };

  render() {
    const {
      SelectProps,
      classes,
      count,
      displayedEntitiesLabelProvider,
      entitiesPerPage,
      entitiesPerPageLabel,
      entitiesPerPageOptions,
      page,
      theme,
      t
    } = this.props;

    const nextLabel = t("Paginator.Next"),
      prevLabel = t("Paginator.Prev"),
      firstLabel = t("Paginator.First"),
      lastLabel = t("Paginator.Last");

    return (
      <Toolbar className={classes.toolbar}>
        <div className={classes.spacer} />
        {entitiesPerPageOptions.length > 1 && (
          <Typography
            color="inherit"
            variant="caption"
            className={classes.label}
          >
            {entitiesPerPageLabel}
          </Typography>
        )}
        {entitiesPerPageOptions.length > 1 && (
          <Select
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              icon: classes.selectIcon
            }}
            input={<InputBase className={classes.input} />}
            value={entitiesPerPage}
            onChange={this.handleEntitiesPerPageChange}
            {...SelectProps}
          >
            {entitiesPerPageOptions.map(entitiesPerPageOption => (
              <MenuItem
                key={entitiesPerPageOption}
                value={entitiesPerPageOption}
              >
                {entitiesPerPageOption}
              </MenuItem>
            ))}
          </Select>
        )}
        <Typography color="inherit" variant="caption" className={classes.label}>
          {displayedEntitiesLabelProvider({
            from: count === 0 ? 0 : (page - 1) * entitiesPerPage + 1,
            to: Math.min(count, page * entitiesPerPage),
            count,
            page
          })}
        </Typography>
        <div className={classes.navButton}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label={firstLabel}
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label={prevLabel}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / entitiesPerPage) - 1}
            aria-label={nextLabel}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / entitiesPerPage) - 1}
            aria-label={lastLabel}
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      </Toolbar>
    );
  }
}

const WrappedPaginator = withNamespaces()(
  withStyles(styles, { withTheme: true })(Paginator)
);

export { WrappedPaginator as Paginator };
