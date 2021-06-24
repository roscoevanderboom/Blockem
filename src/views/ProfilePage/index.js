import React, { useContext } from "react";
import store from "store";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// Actions
import { handleProfileData } from "actions/userProfiles.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import GamesListItem from "components/GamesListItem";
import { ChangeDisplayNameDialog } from "components/CustomDialogs/FormDialogs";

import profile from "assets/img/logo192.png";
import styles from "./profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage() {
  const { userData, gameRoomsData, history } = useContext(store);

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const handleRoomSelect = (room) => {
    console.log("join games");
    handleProfileData({
      action: "update",
      user: userData.user,
      data: { currentGame: room.RoomID },
    }).then(() => history.push("/gameRoom"));
  };

  return (
    <div className={classes.body}>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <Link to="/avatar-select">
                      {userData.avatar.image === "" ? (
                        <img
                          src={profile}
                          alt="avatar image"
                          className={imageClasses}
                        />
                      ) : (
                        <h1 className={classes.playerAvatar}>
                          {userData.avatar.image}
                        </h1>
                      )}
                    </Link>
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {userData.displayName === null
                        ? "No display name"
                        : userData.displayName}
                    </h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.actions}>
              <Link to="/games-list">
                <Button color="github" className={classes.margin5}>
                  Game List
                </Button>
              </Link>
              <Link to="/friends-list">
                <Button color="facebook" className={classes.margin5}>
                  Friends List
                </Button>
              </Link>
              <Link to="/avatar-select">
                <Button color="rose" className={classes.margin5}>
                  Select Avatar
                </Button>
              </Link>
            </div>

            <GridContainer justify="space-evenly">
              <GridItem xs={6}>
                <h4 className={classes.title}>Wins</h4>
                <h3>{userData.wins}</h3>
              </GridItem>
              <GridItem xs={6}>
                <h4 className={classes.title}>Losses</h4>
                <h3>{userData.losses}</h3>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        {/* Current games list */}
        <h4 className={classes.title}>Current games</h4>
        {gameRoomsData.currentGames.map((room, i) => (
          <GamesListItem
            key={i}
            room={room}
            onClick={() => handleRoomSelect(room)}
          />
        ))}
      </div>
      <ChangeDisplayNameDialog />
    </div>
  );
}
