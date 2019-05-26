import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions, Button, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import _ from "lodash";

const styles = {
      card: {
            maxWidth: "100%"
      },
      chip: {
            marginRight: 5
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
            const { classes, hadith, t, ...other } = this.props;

            if (!hadith) {
                  return <Card className={classes.card} />;
            }

            let pickedProps = _.pick(other, ["style", "className"]);

            return (
                  <Card className={classes.card} {...pickedProps}>
                        <CardContent>
                              <Typography>{hadith.text}</Typography>
                              {hadith.tags &&
                                    hadith.tags.map(tag => (
                                          <Chip
                                                key={tag.id}
                                                className={classes.chip}
                                                label={tag.name}
                                                color="primary"
                                          />
                                    ))}
                        </CardContent>
                        <CardActions>
                              <Button
                                    component={Link}
                                    to={`/hadiths/${hadith.id}`}
                                    size="small"
                                    color="primary"
                              >
                                    {t("HadithWidget.GoToHadithPage")}
                              </Button>
                        </CardActions>
                  </Card>
            );
      }
}

const WrappedHadithWidget = withStyles(styles, { withTheme: true })(
      withNamespaces()(HadithWidget)
);

export { WrappedHadithWidget as HadithWidget };
