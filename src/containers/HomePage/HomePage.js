import React from "react";
import HomePageContent from "./components/HomePageContent";
import axios from "axios";

export default class HomePage extends React.Component {
  state = {
    hadith: null
  };

  loadRandomHadith() {
    axios
      .get(`http://api-dev.hadithhouse.net/apis/hadiths/random`)
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
