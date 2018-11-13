import React from "react";
import PropTypes from "prop-types";
import { Paginator } from "../../../components/Paginator";
import { HadithWidget } from "../../../components/HadithWidget";

export default class HadithsPageContent extends React.Component {
  render() {
    const {
      count,
      hadiths,
      hadithsPerPage,
      onChangeHadithsPerPage,
      onChangePage,
      page
    } = this.props;

    if (!hadiths) {
      return <div />;
    }

    return (
      <div>
        {hadiths.map(h => (
          <HadithWidget key={h.id} hadith={h} />
        ))}
        <Paginator
          onChangeEntitiesPerPage={onChangeHadithsPerPage}
          onChangePage={onChangePage}
          page={page}
          count={count}
          entitiesPerPage={hadithsPerPage}
          entitiesPerPageLabel="عدد الأحاديث المعروضة"
          displayedEntitiesLabelProvider={({ from, to, count }) =>
            `${from}-${to} من ${count} حديث`
          }
        />
      </div>
    );
  }
}

HadithsPageContent.propTypes = {
  count: PropTypes.number.isRequired,
  hadiths: PropTypes.array.isRequired,
  hadithsPerPage: PropTypes.number.isRequired,
  onChangeHadithsPerPage: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};
