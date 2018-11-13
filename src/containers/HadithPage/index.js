import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import axios from "axios";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class HadithPage extends React.Component {
  state = {
    hadith: null
  };

  getHadithId() {
    const { match } = this.props;
    return match.params.hadithId;
  }

  componentDidMount() {
    axios
      .get(`http://api-dev.hadithhouse.net/apis/hadiths/${this.getHadithId()}`)
      .then(response => {
        const hadith = response.data;
        this.setState({
          hadith: hadith
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { hadith } = this.state;

    if (!hadith) {
      return <Card className={classes.card} />;
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            حديث رقم {hadith.id}
          </Typography>
          <Typography component="p">{hadith.text}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">تغيير</Button>
        </CardActions>
      </Card>
    );
  }
}

HadithPage.pageInfo = {
  path: "/hadiths/:hadithId",
  icon: <ChatIcon />,
  titleResourceName: "hadith_page_title",
  showInNavDrawer: false
};

HadithPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const comp = withStyles(styles)(HadithPage);

export { comp as HadithPage };
