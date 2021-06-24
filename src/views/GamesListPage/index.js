import React, { useContext, useEffect, useState } from "react";
import store from "store";
// Actions
import { joinRoom, joinRoomRequest } from "../../actions/preGame";
// @material-ui/core components
import { List, Toolbar } from "@material-ui/core";
import { CreateGameroomDialog } from "components/CustomDialogs/CreateGameroomDialog";
import Button from "components/CustomButtons/Button";
import GamesListItem from "components/GamesListItem";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";

const useStyles = makeStyles(styles);

export default function View() {
  const { gameRoomsData, userData, feedback, setLoading } = useContext(store);
  const { roomsList, currentGames } = gameRoomsData;
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [list_type, setList_Type] = useState("available");

  const activeClass = (type) => (list_type === type ? "rose" : "github");

  // eslint-disable-next-line no-unused-vars
  const handleSetListType = (type) => () => {
    setList_Type(type);
  };

  const handleJoinRoom = (room) => {
    const privateRoom = room.Type === "private";
    const anonUser = userData.user.isAnonymous;
    const hasAvatar = userData.avatar.image !== "";
    const hasSameAvatar = userData.avatar.image === room.Host.token.image;

    if (!userData.user.emailVerified && !anonUser) {
      feedback(
        "error",
        "Your account has not been verified. Please check more email."
      );
      return;
    }
    if (!hasAvatar) {
      feedback("error", "Please select an avatar before joining a game.");
      return;
    }
    if (hasSameAvatar) {
      feedback("error", "The host has already selected that avatar.");
      return;
    }
    if (privateRoom && anonUser) {
      feedback("error", "Only registered users can join private rooms.");
      return;
    }
    if (privateRoom && !anonUser) {
      joinRoomRequest(userData, room, feedback);
      return;
    }
    setLoading(true);
    joinRoom(userData, room);
  };

  useEffect(() => {
    switch (list_type) {
      case "active":
        setList(currentGames);
        break;
      case "available":
        setList(roomsList);
        break;
      default:
        break;
    }
  }, [list_type, currentGames, roomsList]);

  return (
    <GridContainer className={classes.container}>
      <GridItem xs={11} sm={8} md={6} lg={4}>
        <h3 className={classes.title}>Games list</h3>
        <Toolbar variant="dense" className={classes.toolbar}>
          <CreateGameroomDialog />
          <Button
            color={activeClass("active")}
            onClick={handleSetListType("active")}
          >
            Active
          </Button>
          <Button
            color={activeClass("available")}
            onClick={handleSetListType("available")}
          >
            Available
          </Button>
        </Toolbar>
        <List>
          {list.map((room, i) => (
            <GamesListItem
              key={i}
              room={room}
              onClick={() => handleJoinRoom(room)}
            />
          ))}
        </List>
      </GridItem>
    </GridContainer>
  );
}
