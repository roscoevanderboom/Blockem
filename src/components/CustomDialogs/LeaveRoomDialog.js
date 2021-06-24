/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import store from "store";
import board_context from "store/board";
// Actions
import { deleteRoom, leaveRoom } from "actions/gamerooms";
// Components
import { DefaultDialog } from ".";
import Button from "components/CustomButtons/Button";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./modalStyle";
const useStyles = makeStyles(styles);

export const LeaveRoomDialog = () => {
  const classes = useStyles();
  const { userData, history } = useContext(store);
  const { gameBoardData } = useContext(board_context);
  const { RoomID, Host, Guest } = gameBoardData;
  const [open, setOpen] = useState(false);

  const handleLeaveRoom = () => {
    if (userData.uid === Host.uid) {
      deleteRoom(RoomID, userData, history);
    } else if (userData.uid === Guest.uid || userData.user.isAnonymous) {
      leaveRoom(RoomID, userData, history);
    }
  };

  return (
    <DefaultDialog
      open={open}
      trigger={
        <Button color="danger" onClick={() => setOpen(true)}>
          Leave game
        </Button>
      }
      bodyContent={
        <div>
          <h3 className="winner-text">
            Are you sure you want to leave the game?
          </h3>
        </div>
      }
      actions={
        <div className={classes.winnerModalActions}>
          <Button block color="success" onClick={() => setOpen(false)}>
            Keep playing
          </Button>
          <Button block color="warning" onClick={handleLeaveRoom}>
            leave room
          </Button>
        </div>
      }
    />
  );
};
