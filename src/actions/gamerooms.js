/* eslint-disable no-unused-vars */
import { FieldValue } from "../firebase";
import { noGuest } from "../constants/gameRoomObjects";
import { gameRooms } from "../firebase/collections";
// Actions
import { handleProfileData } from "./userProfiles";

export const deleteRoom = (roomID, userData, history, setLoading) => {
  gameRooms
    .doc(roomID)
    .delete()
    .then(() => {
      history.push("/avatar-select");
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { currentGame: false },
      });
      // .then(() => setLoading(false));
    })
    .catch((err) => console.log(err.message));
};
export const leaveRoom = (roomID, userData, history, setLoading) => {
  gameRooms
    .doc(roomID)
    .update({
      Available: true,
      Guest: noGuest,
      NextPlayer: false,
      Participants: FieldValue.arrayRemove(userData.uid),
    })
    .then(() => {
      history.push("/avatar-select");
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { currentGame: false },
      });
      // .then(() => setLoading(false));
    })
    .catch((err) => {
      setLoading(false);
      console.log(err.message);
    });
};
export const nextMove = (roomID, data) => {
  gameRooms
    .doc(roomID)
    .update(data)
    .catch((err) => console.log(err.message));
};
import { bigSquares } from "constants/board";
export const resetGame = (room) => {
  const { RoomID, Host, Guest } = room;
  gameRooms.doc(RoomID).update({
    Guest: Host,
    Host: Guest,
    NextPlayer: Host,
    NextSquare: false,
    SquaresPlayed: bigSquares,
  });
};
export const sendFriendRequest = (roomID, username) => {
  gameRooms.doc(roomID).update({
    FriendRequests: FieldValue.arrayUnion(username),
  });
};
