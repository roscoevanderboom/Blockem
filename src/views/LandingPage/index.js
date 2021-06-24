import React from "react";
import { Link } from "react-router-dom";
// Constants
import { mobileSpecs } from "constants/mobileDeviceChecks.js";
import { howToSteps, technicalRules } from "constants/howTo.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./landingPage.js";

const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();

  const id = "how-to-step";
  const rules = "rules";

  return (
    <div style={{ paddingBottom: 100 }}>
      <div id="top" className={classes.headerContainer}>
        <div id="overlay">
          <GridContainer className={classes.container}>
            <GridItem xs={12} sm={10} md={8}>
              <h1 className={classes.title}>Welcome to Tic Tac Farm</h1>
              <h3 className={classes.secondaryTitle}>
                The ultimate Tic Tac Toe game!
              </h3>
            </GridItem>
            <GridItem xs={12} sm={10} md={8}></GridItem>
            <GridItem xs={10} className={mobileSpecs ? "" : classes.howTo}>
              <Link to="/login">
                <Button color="danger" size={mobileSpecs ? "sm" : "lg"}>
                  <i className="fas fa-play" />
                  Begin your adventure!
                </Button>
              </Link>
              <Button
                href="#how-to-play"
                size={mobileSpecs ? "sm" : "lg"}
                color="facebook"
              >
                How to play
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <GridContainer
        id="how-to-play"
        justify="center"
        className={classes.section}
      >
        <GridItem item xs={12} sm={10} md={9}>
          <GridContainer>
            {howToSteps.map((step, i) => (
              <GridItem
                key={i}
                id={id + (i + 1)}
                xs={12}
                md={6}
                className={classes.howTo}
              >
                <h4 className={classes.secondaryTitle}>{step.title}</h4>
                <p className={classes.bodyText}>{step.bodyText}</p>
                <img
                  src={step.image}
                  alt={step.title}
                  className={classes.howToImages}
                />
                <br />
                {howToSteps[i + 1] !== undefined && mobileSpecs && (
                  <Button
                    href={`#${id + (i + 2)}`}
                    size={mobileSpecs ? "sm" : "lg"}
                    color="facebook"
                  >
                    {howToSteps[i + 1] !== undefined && howToSteps[i + 1].title}
                  </Button>
                )}
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer id="rules" justify="center" className={classes.section}>
        <GridItem item xs={12} sm={10} md={9}>
          <h3 className={classes.secondaryTitle}>Some more technical rules</h3>
          <GridContainer>
            {technicalRules.map((step, i) => (
              <GridItem
                key={i}
                id={rules + (i + 1)}
                xs={12}
                md={6}
                className={classes.howTo}
              >
                <h4 className={classes.secondaryTitle}>{step.title}</h4>
                <p className={classes.bodyText}>{step.bodyText}</p>
                <img
                  src={step.image}
                  alt={step.title}
                  className={classes.howToImages}
                />
                <br />
                {technicalRules[i + 1] !== undefined && mobileSpecs ? (
                  <Button
                    href={`#${rules + (i + 2)}`}
                    size={mobileSpecs ? "sm" : "lg"}
                    color="facebook"
                  >
                    {technicalRules[i + 1] !== undefined &&
                      technicalRules[i + 1].title}
                  </Button>
                ) : (
                  <Button
                    href="#top"
                    size={mobileSpecs ? "sm" : "lg"}
                    color="facebook"
                  >
                    Back to top
                  </Button>
                )}
              </GridItem>
            ))}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
