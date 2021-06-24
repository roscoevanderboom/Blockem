/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import store from "store";
import { Link } from "react-router-dom";
// Actions
import {
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "actions/auth";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, Icon, Tooltip } from "@material-ui/core";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "./loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);
const init = {
  email: "",
  password: "",
};

export default function LoginPage() {
  // eslint-disable-next-line no-unused-vars
  const { feedback, history } = useContext(store);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [formData, setFormData] = useState(init);
  const classes = useStyles();
  const handleData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    if ((e.type === "keypress" && e.key === "Enter") || e.type === "click") {
      if (formData.email === "" || formData.password === "") {
        feedback("info", "Please complete the form.");
      } else {
        signInWithEmailAndPassword(
          formData.email,
          formData.password,
          feedback,
          history
        );
      }
    }
  };

  const handleAnonymousSignIn = () => {
    if (
      window.confirm(
        "Are you sure you want to sign in anonymously?\nYou will be missing out on many great features!"
      )
    ) {
      signInAnonymously(history);
    }
  };

  const handlePopupLogin = () => signInWithPopup(history);

  useEffect(() => {
    const timeOut = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onKeyPress={handleSubmit}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        color="transparent"
                        onClick={handlePopupLogin}
                      >
                        <i className={"fab fa-google"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        onChange: (e) => handleData("email", e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: (e) => handleData("password", e.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" onClick={handleSubmit}>
                      sign in
                    </Button>
                    <Link to="/create-profile">
                      <Button color="github">register</Button>
                    </Link>
                  </CardFooter>
                  {/* <CardFooter className={classes.cardFooter}>
                    <Tooltip
                      id="anonymous-signin"
                      title="Anonymous users cannot add friends or create private game rooms."
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button color="danger" onClick={handleAnonymousSignIn}>
                        sign in anonymously
                      </Button>
                    </Tooltip>
                  </CardFooter> */}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
