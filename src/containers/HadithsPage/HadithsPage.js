import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
import HadithsPageContent from "./components/HadithsPageContent";
import axios from "axios";

export default class HadithsPage extends React.Component {
  static pageInfo = {
    path: "/hadiths",
    icon: <ChatIcon />,
    titleResourceName: "HadithsPage.Title",
    showInNavDrawer: true
  };

  state = {
    hadiths: [],
    hadithsPerPage: 10,
    page: 1,
    count: 0
  };

  loadHadiths(page, hadithsPerPage) {
    axios
      .get(`http://api.hadithhouse.net/apis/hadiths/`, {
        params: {
          limit: hadithsPerPage,
          offset: (page - 1) * hadithsPerPage,
          ordering: "-updated_on",
          expand: true
        }
      })
      .then(response => {
        const { count, results } = response.data;
        this.setState({
          page: page,
          hadithsPerPage: hadithsPerPage,
          hadiths: results,
          count: count
        });
      });
  }

  onChangeHadithsPerPage = entitiesPerPage => {
    this.loadHadiths(1, entitiesPerPage);
  };

  onChangePage = page => {
    this.loadHadiths(page, this.state.hadithsPerPage);
  };

  componentDidMount() {
    this.loadHadiths(this.state.page, this.state.hadithsPerPage);
  }

  render() {
    const { count, hadiths, hadithsPerPage, page } = this.state;

    return (
      <div>
        <HadithsPageContent
          count={count}
          hadiths={hadiths}
          hadithsPerPage={hadithsPerPage}
          onChangeHadithsPerPage={this.onChangeHadithsPerPage}
          onChangePage={this.onChangePage}
          page={page}
        />
      </div>
    );
  }
}
