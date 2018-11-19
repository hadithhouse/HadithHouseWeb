import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";

const styles = {
  card: {
    maxWidth: "100%"
  }
};

class HadithWidget extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // Set by withStyles()
    hadith: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired // Set by withI18n()
  };

  state = {
    hadith: null
  };

  render() {
    const { classes, hadith, t } = this.props;

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
            {t("HadithWidget.GoToHadithPage")}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const WrappedHadithWidget = withStyles(styles)(withNamespaces()(HadithWidget));

export { WrappedHadithWidget as HadithWidget };
