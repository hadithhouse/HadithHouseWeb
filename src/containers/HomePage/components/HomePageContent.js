import React from "react";
import PropTypes from "prop-types";
import { HadithWidget } from "../../../components/HadithWidget";

export default class HomePageContent extends React.Component {
  render() {
    const { hadith } = this.props;

    if (!hadith) {
      return <div />;
    }

    return (
      <div>
        <HadithWidget hadith={hadith} />
      </div>
    );
  }
}

HomePageContent.propTypes = {
  hadith: PropTypes.object
};
