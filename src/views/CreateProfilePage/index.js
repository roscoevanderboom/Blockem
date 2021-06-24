/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import store from "store";
import { Link } from "react-router-dom";
// Actions
import { createUserWithEmailAndPassword } from "../../actions/auth";
import { handlePasswordErrors } from "./validation";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import { Email, Lock, Loop } from "@material-ui/icons";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import ErrorTooltip from "./ErrorTooltip";

import styles from "../LoginPage/loginPage";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);
const init = {
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function CreatProfilePage() {
  const { feedback, history } = useContext(store);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const classes = useStyles();
  const [formData, setFormData] = useState(init);
  const [isFormReady, setIsFormReady] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const emailEmpty = formData.email === "";
  const passwordEmpty = formData.password === "";
  const password_do_not_match = formData.password !== formData.confirmPassword;
  const terms_not_accepted = formData.acceptTerms === false;

  const handleData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    if ((e.type === "keypress" && e.key === "Enter") || e.type === "click") {
      if (isFormReady) {
        createUserWithEmailAndPassword(formData, history);
      }
    }
  };

  const inputs = [
    {
      id: "email",
      type: "text",
      label: "Email",
      icon: Email,
      error: emailEmpty,
      onChange: handleData,
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      icon: Lock,
      error: passwordEmpty,
      onChange: handleData,
    },
    {
      id: "confirmPassword",
      type: "password",
      label: "Confirm",
      icon: Loop,
      error: password_do_not_match,
      onChange: handleData,
    },
  ];

  useEffect(() => {
    if (
      !emailEmpty &&
      !passwordEmpty &&
      !password_do_not_match &&
      !terms_not_accepted
    ) {
      setIsFormReady(true);
    } else {
      setIsFormReady(false);
    }
    handlePasswordErrors(formData.password, setPasswordErrors);
  }, [formData]);

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
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onKeyPress={handleSubmit}>
                  <CardHeader color="success" className={classes.cardHeader}>
                    <ErrorTooltip
                      password={formData.password}
                      passwordErrors={passwordErrors}
                    >
                      <h4>Become a farmer!</h4>
                    </ErrorTooltip>
                  </CardHeader>

                  <CardBody>
                    {inputs.map((input, i) => (
                      <CustomInput
                        key={i}
                        id={input.id}
                        labelText={input.label}
                        formControlProps={{
                          fullWidth: true,
                          error: input.error,
                        }}
                        inputProps={{
                          type: input.type,
                          onChange: (e) => handleData(input.id, e.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <input.icon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    ))}
                    <input
                      type="checkbox"
                      onClick={() =>
                        handleData("acceptTerms", !formData.acceptTerms)
                      }
                      value={formData.acceptTerms}
                    />
                    <span>Accept terms of use.</span>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      disabled={!isFormReady}
                      color="primary"
                      onClick={handleSubmit}
                    >
                      register
                    </Button>
                    <Link to="/login">
                      <Button color="github">sign in</Button>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
