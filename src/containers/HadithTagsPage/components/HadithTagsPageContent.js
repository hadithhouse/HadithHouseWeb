import React from "react";
import PropTypes from "prop-types";
import { Paginator } from "../../../components/Paginator";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core";

const styles = {};

class HadithTagsPageContent extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    tagsPerPage: PropTypes.number.isRequired,
    onChangeTagsPerPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired // Set by withNamespaces()
  };

  render() {
    const {
      classes,
      count,
      tags,
      tagsPerPage,
      onChangeTagsPerPage,
      onChangePage,
      page,
      t
    } = this.props;

    if (!tags) {
      return <div />;
    }

    const numberOfDisplayedTagsLabel = t(
      "HadithTagsPage.NumberOfDisplayedTags"
    );
    const rangeOfDisplayedTagsLabelProvider = ({ from, to, count }) => {
      return t("HadithTagsPage.RangeOfDisplayedTags", { from, to, count });
    };

    return (
      <div>
        {tags.map(h => (
          <div key={h.id} className={classes.hadithWidget}>
            {h.name}
          </div>
        ))}
        <Paginator
          onChangeEntitiesPerPage={onChangeTagsPerPage}
          onChangePage={onChangePage}
          page={page}
          count={count}
          entitiesPerPage={tagsPerPage}
          entitiesPerPageLabel={numberOfDisplayedTagsLabel}
          displayedEntitiesLabelProvider={rangeOfDisplayedTagsLabelProvider}
        />
      </div>
    );
  }
}

const WrappedHadithTagsPageContent = withStyles(styles)(
  withNamespaces()(HadithTagsPageContent)
);

export default WrappedHadithTagsPageContent;
