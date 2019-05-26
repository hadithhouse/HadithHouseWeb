import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import HomePageContent from "./components/HomePageContent";
import axios from "axios";

export default class HomePage extends React.Component {
  static pageInfo = {
    path: "/",
    icon: <HomeIcon />,
    titleResourceName: "HomePage.Title",
    showInNavDrawer: true
  };

  state = {
    hadith: null
  };

  loadRandomHadith() {
    axios
      .get(`http://api-dev.hadithhouse.net/apis/hadiths/random`, {
        params: { expand: true }
      })
      .then(response => {
        this.setState({
          hadith: response.data
        });
      });
  }

  componentDidMount() {
    this.loadRandomHadith();
  }

  render() {
    const { hadith } = this.state;

    return <HomePageContent hadith={hadith} />;
  }
}
