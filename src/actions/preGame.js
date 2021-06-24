/* eslint-disable no-unused-vars */
import { FieldValue } from "../firebase";
import { newRoom, playerData } from "../constants/gameRoomObjects";
import { gameRooms } from "../firebase/collections";
// Actions
import { handleProfileData } from "./userProfiles";

const random = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const fetchGamerooms = (uid, dispatch_gameRooms) => {
  gameRooms.onSnapshot(
    (querySnapshot) => {
      let roomsList = [];
      let currentGames = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.exists &&
          !doc.data().InProgress &&
          doc.data().Available &&
          !doc.data().Participants.includes(uid)
        ) {
          roomsList.push(doc.data());
        }
        if (doc.exists && doc.data().Participants.includes(uid)) {
          currentGames.push(doc.data());
        }
      });
      dispatch_gameRooms({
        type: "SET_ROOMSLIST",
        payload: roomsList,
      });
      dispatch_gameRooms({
        type: "SET_CURRENT_GAMES",
        payload: currentGames,
      });
    },
    (err) => {
      console.log("Error getting documents: ", err);
    }
  );
};
export const watchGameroom = (
  id,
  uid,
  dispatch,
  setLoading,
  history,
  feedback
) => {
  let removeListener;
  removeListener = gameRooms.doc(id).onSnapshot(
    function (doc) {
      // Game is in session
      if (doc && doc.exists && doc.data().Participants.includes(uid)) {
        dispatch({
          type: "SET_ROOM_DATA",
          payload: doc.data(),
        });
        setLoading(false);
      }
      if (doc && doc.exists && !doc.data().Participants.includes(uid)) {
        removeListener();
        setLoading(false);
      }
      if (!doc.exists) {
        feedback("info", "Game room has been deleted.");
        history.push("/avatar-select");
        removeListener();
        setLoading(false);
      }
    },
    function (err) {
      console.log(err.message);
      removeListener();
      setLoading(false);
    }
  );
};
export const createGameRoom = (userData, roomData) => {
  let newRoomID = random();
  let data = newRoom(playerData(userData), newRoomID, roomData);
  gameRooms
    .doc(newRoomID)
    .set(data)
    .then(() => {
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { currentGame: newRoomID },
      });
    })
    .catch((err) => console.log(err.message));
};
export const joinRoom = (userData, room) => {
  gameRooms
    .doc(room.RoomID)
    .update({
      Available: false,
      Guest: playerData(userData),
      InProgress: true,
      NextPlayer: playerData(userData),
      Participants: FieldValue.arrayUnion(userData.user.uid),
    })
    .then(() => {
      if (!userData.user.isAnonymous) {
        handleProfileData({
          action: "update",
          user: userData.user,
          data: { currentGame: room.RoomID },
        });
      }
    })
    .catch((err) => console.log(err.message));
};
export const joinRoomRequest = (userData, room, feedback) => {
  gameRooms
    .doc(room.RoomID)
    .update({
      JoinRoomRequests: FieldValue.arrayUnion(playerData(userData)),
    })
    .then(() =>
      feedback("info", "A request to join game has been sent to the host.")
    );
};
export const acceptJoinRoomRequest = (request) => {
  gameRooms.doc(request.room).update({
    Available: false,
    Guest: request.guest,
    InProgress: true,
    JoinRoomRequests: [],
    NextPlayer: request.guest,
    Participants: FieldValue.arrayUnion(request.guest.uid),
  });
};
