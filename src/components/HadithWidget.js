import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { CardActions, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: "100%"
  }
};

class HadithWidget extends React.Component {
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
    const { classes, hadith } = this.props;

    if (!hadith) {
      return <Card className={classes.card} />;
    }

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>{hadith.text}</Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/hadiths/${hadith.id}`} size="small">
            الذهاب الى صفحة الحديث
          </Button>
        </CardActions>
      </Card>
    );
  }
}

HadithWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  hadith: PropTypes.object.isRequired
};

const comp = withStyles(styles)(HadithWidget);

export { comp as HadithWidget };
