import React from "react";
import PropTypes from "prop-types";
import { Paginator } from "../../../components/Paginator";
import { HadithWidget } from "../../../components/HadithWidget";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core";

const styles = {
  hadithWidget: {
    marginBottom: 5
  }
};

class HadithsPageContent extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    hadiths: PropTypes.array.isRequired,
    hadithsPerPage: PropTypes.number.isRequired,
    onChangeHadithsPerPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired // Set by withNamespaces()
  };

  render() {
    const {
      classes,
      count,
      hadiths,
      hadithsPerPage,
      onChangeHadithsPerPage,
      onChangePage,
      page,
      t
    } = this.props;

    if (!hadiths) {
      return <div />;
    }

    const numberOfDisplayedHadithsLabel = t(
      "HadithsPage.NumberOfDisplayedHadiths"
    );
    const rangeOfDisplayedHadithsLabelProvider = ({ from, to, count }) => {
      return t("HadithsPage.RangeOfDisplayedHadiths", { from, to, count });
    };

    return (
      <div>
        {hadiths.map(h => (
          <HadithWidget
            key={h.id}
            hadith={h}
            className={classes.hadithWidget}
          />
        ))}
        <Paginator
          onChangeEntitiesPerPage={onChangeHadithsPerPage}
          onChangePage={onChangePage}
          page={page}
          count={count}
          entitiesPerPage={hadithsPerPage}
          entitiesPerPageLabel={numberOfDisplayedHadithsLabel}
          displayedEntitiesLabelProvider={rangeOfDisplayedHadithsLabelProvider}
        />
      </div>
    );
  }
}

const WrappedHadithsPageContent = withStyles(styles)(
  withNamespaces()(HadithsPageContent)
);

export default WrappedHadithsPageContent;
