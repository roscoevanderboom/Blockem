/* eslint-disable no-unused-vars */
import { FieldValue } from "../firebase";
import { userProfiles } from "../firebase/collections";
import { setProfile } from "reducers/userDataReducer";

const friendListRef = (uid) => userProfiles.doc(uid).collection("friendsList");

const requestRef = (uid) => {
  return friendListRef(uid).doc("requests");
};
const friendsRef = (uid) => {
  return friendListRef(uid).doc("friends");
};
const bannedRef = (uid) => {
  return friendListRef(uid).doc("banned");
};

export const createFriendsList = (uid) => {
  requestRef(uid)
    .set({ list: [] })
    .then(() => console.log("success"));
  friendsRef(uid)
    .set({ list: [] })
    .then(() => console.log("success"));
};
export const watchFriendsList = (uid, dispatch) => {
  friendListRef(uid).onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.exists && doc.id === "requests") {
        setProfile(dispatch, { friendRequests: doc.data().list });
      }
      if (doc.exists && doc.id === "friends") {
        setProfile(dispatch, { friendsList: doc.data().list });
      }
    });
  }),
    function handleErrors(err) {
      console.log(err.message);
    };
};
export const sendFriendRequest = (friendUID, myData, feedback) => {
  requestRef(friendUID)
    .update({ list: FieldValue.arrayUnion(myData) })
    .then(() => feedback("success", "Friend request send"));
};
export const acceptFriendRequest = (myData, friendData, feedback) => {
  requestRef(myData.uid).update({ list: FieldValue.arrayRemove(friendData) });
  friendsRef(myData.uid)
    .update({ list: FieldValue.arrayUnion(friendData) })
    .then(() => {
      friendsRef(friendData.uid)
        .get()
        .then((doc) => {
          let are_we_friends = doc
            .data()
            .list.filter((friends) => friends.uid === myData.uid);
          if (are_we_friends.length === 0) {
            sendFriendRequest(friendData.uid, myData, feedback);
          }
        });
    });
};
export const inviteFriendToGame = (uid, myID, roomID) => {
  userProfiles
    .doc(uid)
    .collection("friendsList")
    .doc("requests")
    .update({
      [myID]: {
        gameInvites: FieldValue.arrayUnion(roomID),
        messages: [],
      },
    })
    .then(() => console.log("success"))
    .catch((err) => console.log(err.message));
};
export const removeFriend = (uid, friend) => {
  friendsRef(uid).update({ list: FieldValue.arrayRemove(friend) });
};
