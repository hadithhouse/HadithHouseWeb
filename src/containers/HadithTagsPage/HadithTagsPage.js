import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
import HadithTagsPageContent from "./components/HadithTagsPageContent";
import axios from "axios";

export default class HadithTagsPage extends React.Component {
  static pageInfo = {
    path: "/hadithtags",
    icon: <ChatIcon />,
    titleResourceName: "HadithTagsPage.Title",
    showInNavDrawer: true
  };

  state = {
    tags: [],
    tagsPerPage: 10,
    page: 1,
    count: 0
  };

  loadTags(page, tagsPerPage) {
    axios
      .get(`http://api.hadithhouse.net/apis/hadithtags/`, {
        params: {
          limit: tagsPerPage,
          offset: (page - 1) * tagsPerPage,
          ordering: "-updated_on",
          expand: true
        }
      })
      .then(response => {
        const { count, results } = response.data;
        this.setState({
          page: page,
          tagsPerPage: tagsPerPage,
          tags: results,
          count: count
        });
      });
  }

  onChangeTagsPerPage = entitiesPerPage => {
    this.loadTags(1, entitiesPerPage);
  };

  onChangePage = page => {
    this.loadTags(page, this.state.tagsPerPage);
  };

  componentDidMount() {
    this.loadTags(this.state.page, this.state.tagsPerPage);
  }

  render() {
    const { count, tags, tagsPerPage, page } = this.state;

    return (
      <div>
        <HadithTagsPageContent
          count={count}
          tags={tags}
          tagsPerPage={tagsPerPage}
          onChangeTagsPerPage={this.onChangeTagsPerPage}
          onChangePage={this.onChangePage}
          page={page}
        />
      </div>
    );
  }
}
