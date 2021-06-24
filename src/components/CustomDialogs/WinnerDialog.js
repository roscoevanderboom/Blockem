/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useMemo, useState } from "react";
// import { FieldValue } from "../../firebase";
// Store
import board_context from "store/board";
import store from "store";
import { gameboard_dispatch } from "reducers/gameRoomsReducer";
// Components
import { DefaultDialog } from ".";
import Button from "components/CustomButtons/Button";
// Actions
import { deleteRoom, leaveRoom, resetGame } from "actions/gamerooms";
import { acceptFriendRequest, sendFriendRequest } from "actions/friendsList";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./modalStyle";
const useStyles = makeStyles(styles);

export const WinnerDialog = () => {
  const classes = useStyles();
  const { userData, feedback, history } = useContext(store);
  const { gameBoardData, dispatch } = useContext(board_context);
  const { RoomID, Winner, Guest, Host, NextPlayer } = gameBoardData;
  const { uid, friendRequests, friendsList, displayName, user } = userData;
  const [loser, setLoser] = useState(false);
  const [friendRequest, setFriendRequest] = useState(false);

  const WinnerMemo = useMemo(
    () => ({
      Winner,
    }),
    [Winner]
  );

  const isUserFriend = () => {
    let friend = friendsList.filter(
      (user) =>
        user.username === Host.username || user.username === Guest.username
    );
    if (friend.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleLeaveRoom = () => {
    if (uid === Host.uid) {
      deleteRoom(RoomID, userData, history);
    } else if (uid === Guest.uid || user.isAnonymous) {
      leaveRoom(RoomID, userData, history);
    }
  };

  const handleSendFriendRequest = () => {
    let friendUID = uid !== Guest.uid ? Guest.uid : Host.uid;
    sendFriendRequest(friendUID, { username: displayName, uid: uid }, feedback);
  };

  const handleAcceptFriendRequest = () => {
    acceptFriendRequest(
      { username: displayName, uid: uid },
      friendRequest,
      feedback
    );
  };

  const handleResetGame = () => {
    resetGame(gameBoardData, gameboard_dispatch, dispatch);
  };

  const LoserMessage = () => (
    <div>
      <h3 className="winner-text">Sorry</h3>
      <h1 className="winner-icon">{WinnerMemo.Winner && loser.token.image}</h1>
      <h4 className="winner-text">Better luck next time!</h4>
    </div>
  );

  const WinnerMessage = () => (
    <div>
      <h1 className="winner-icon">
        {WinnerMemo.Winner && WinnerMemo.Winner.token.image}
      </h1>
      <h3 className="winner-text">Congratulations!</h3>
      <h3 className="winner-text">
        {WinnerMemo.Winner && WinnerMemo.Winner.username}
      </h3>
    </div>
  );

  const DrawMessage = () => <h3 className="winner-text">It's a draw!</h3>;

  const DialogMessage = () => {
    return (
      <>
        {uid === WinnerMemo.Winner.uid && <WinnerMessage />}
        {uid === loser.uid && <LoserMessage />}
        {WinnerMemo.Winner === "no winner" && <DrawMessage />}
      </>
    );
  };

  useEffect(() => {
    if (WinnerMemo.Winner && WinnerMemo.Winner.uid === Host.uid) {
      setLoser(Guest);
    } else if (WinnerMemo.Winner && WinnerMemo.Winner.uid === Guest.uid) {
      setLoser(Host);
    }
  }, [WinnerMemo.Winner]);

  useEffect(() => {
    if (friendRequests.length !== 0) {
      let request = friendRequests.filter(
        (user) =>
          user.username === Host.username || user.username === Guest.username
      );
      if (request.length === 1) {
        setFriendRequest(request[0]);
      } else if (request.length === 0) {
        setFriendRequest(false);
      }
    } else if (friendRequests.length === 0) {
      setFriendRequest(false);
    }
  }, [friendRequests]);

  return (
    <DefaultDialog
      open={WinnerMemo.Winner ? true : false}
      bodyContent={<DialogMessage />}
      actions={
        <div className={classes.winnerModalActions}>
          {NextPlayer && (
            <Button block color="success" onClick={handleResetGame}>
              Play again
            </Button>
          )}
          <Button block color="warning" onClick={handleLeaveRoom}>
            leave room
          </Button>
          {NextPlayer && !isUserFriend() && (
            <Button block color="facebook" onClick={handleSendFriendRequest}>
              send a friend request
            </Button>
          )}
          {friendRequest && (
            <>
              <h6>{`${friendRequest.username} has send you a friend request.`}</h6>
              <Button
                block
                color="facebook"
                onClick={handleAcceptFriendRequest}
              >
                Add them?
              </Button>
            </>
          )}
        </div>
      }
    />
  );
};
