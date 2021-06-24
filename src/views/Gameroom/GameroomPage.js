/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Store
import board_context from "store/board";
import store from "store";
import { gameboard_dispatch } from "reducers/gameRoomsReducer";
// Actions
import { handleProfileData } from "actions/userProfiles.js";
// Components
import Button from "components/CustomButtons/Button";
import Board from "./Board";
import { WinnerDialog } from "components/CustomDialogs/WinnerDialog";
import { LeaveRoomDialog } from "components/CustomDialogs/LeaveRoomDialog";

export default function View() {
  const { userData } = useContext(store);
  const { gameBoardData, dispatch } = useContext(board_context);
  const { RoomID, NextPlayer, TitleText, InProgress } = gameBoardData;

  const BackToProfile = () => {
    const handleBackToProfile = () => {
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { currentGame: false },
      });
    };
    return (
      <Link to="/profile">
        <Button color="info" variant="outlined" onClick={handleBackToProfile}>
          back to profile page
        </Button>
      </Link>
    );
  };
  // Set title text
  useEffect(() => {
    if (NextPlayer && NextPlayer.uid !== userData.uid) {
      gameboard_dispatch("TitleText", "Waiting for opponent...", dispatch);
    } else if (NextPlayer && NextPlayer.uid === userData.uid) {
      gameboard_dispatch("TitleText", "It's your turn", dispatch);
    } else if (!InProgress && !NextPlayer) {
      gameboard_dispatch(
        "TitleText",
        "Waiting for another player to join ...",
        dispatch
      );
    }
  }, [NextPlayer]);

  if (RoomID) {
    return (
      <div className="default-page-style">
        <h2 className="gameRoom-next-player-image">
          {NextPlayer.token !== undefined ? NextPlayer.token.image : ""}
        </h2>
        <h3>{TitleText}</h3>
        <Board />
        <LeaveRoomDialog />
        <WinnerDialog />
      </div>
    );
  } else {
    return (
      <div className="default-page-style">
        <div className="default-page-container">
          <h3>No active game room</h3>
        </div>

        <BackToProfile />
      </div>
    );
  }
}
