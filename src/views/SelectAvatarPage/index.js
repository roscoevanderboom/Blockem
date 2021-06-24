import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import store from "store";
// Actions
import { handleProfileData } from "../../actions/userProfiles";
// Avatars
import avatars from "constants/tokens.js";
// @material-ui/core components
import GridContainer from "components/Grid/GridContainer";
import Button from "components/CustomButtons/Button";
import Grid from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import "./styles.css";

const useStyles = makeStyles(styles);

export default function View() {
  const { userData, dispatch_user, history } = useContext(store);
  const classes = useStyles();
  const [currentToken, setCurrentToken] = useState(false);

  const handleAvatarSelect = (token) => () => {
    if (userData.user.isAnonymous) {
      dispatch_user({
        type: "SET_PROFILE",
        payload: { avatar: token },
      });
    } else {
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { avatar: token },
      });
    }
    history.push("/games-list");
  };

  const NoAvatar = () => <h3 className={classes.title}>Select your Avatar</h3>;
  const AvatarSelected = () => (
    <>
      <h3
        className={classes.title}
      >{`Good luck ${currentToken.adj} ${currentToken.image}`}</h3>
      <br />
      <Link to="/games-list">
        <Button color="rose" size="sm" className={classes.margin5}>
          Game List
        </Button>
      </Link>
    </>
  );

  useEffect(() => {
    setCurrentToken(userData.avatar);
  }, [userData.avatar]);

  return (
    <div className={classes.container}>
      {currentToken && currentToken.image !== "" ? (
        <AvatarSelected />
      ) : (
        <NoAvatar />
      )}
      <GridContainer className={classes.paper}>
        {avatars.map((avatar, i) => (
          <Grid
            key={i}
            xs={4}
            md={3}
            className={classes.gridItem}
            onClick={handleAvatarSelect(avatar)}
          >
            <div className="avatarIcon">
              <h1 className={classes.avatar}>{avatar.image}</h1>
              <h5 className="avatarIcon-text">{avatar.name}</h5>
            </div>
          </Grid>
        ))}
      </GridContainer>
    </div>
  );
}
