import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const styles = {
  card: {
    maxWidth: "100%"
  }
};

class Hadith extends React.Component {
  state = {
    hadith: null
  };

  componentDidMount() {
    axios
      .get(`http://api-dev.hadithhouse.net/apis/hadiths/${this.props.hadithId}`)
      .then(response => {
        const hadith = response.data;
        this.setState({
          hadith: hadith
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            {this.state.hadith != null ? this.state.hadith.text : ""}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Hadith.propTypes = {
  classes: PropTypes.object.isRequired,
  hadithId: PropTypes.string.isRequired
};

const comp = withStyles(styles)(Hadith);

export { comp as Hadith };
