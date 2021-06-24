import { auth } from "../firebase/auth";
import { firebase } from "../firebase";
// Actions
import { handleProfileData } from "./userProfiles";
import { createFriendsList } from "./friendsList";
// Constants
import { basic_user_profile_data } from "../constants/userProfileData";
// Handle auth status
export const handleUserAuth = (history, dispatch_user, setLoading) => {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      history.push("/");
      setLoading(false);
    }
    dispatch_user({
      type: "SET_USER",
      payload: user,
    });
  });
};
// Sign in methods
export const signInAnonymously = (history) =>
  auth.signInAnonymously().then(() => history.push("/avatar-select"));
export const signInWithEmailAndPassword = (email, password, feedback, hist) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => hist.push("/profile"))
    .catch((err) => feedback("error", err.message));
};
export const signInWithPopup = (hist) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then(function (result) {
      // The signed-in user info.
      var user = result.user;
      if (result.additionalUserInfo.isNewUser) {
        handleProfileData({
          action: "set",
          user,
          data: basic_user_profile_data(user),
        }).then(() => {
          createFriendsList(user.uid);
          hist.push("/avatar-select");
        });
      }
    })
    .catch(function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};
// Verification methods
export const handleVerification = (user) => {
  user
    .sendEmailVerification()
    .then(function () {
      console.log("Email sent");
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
// Create user account methods
export const createUserWithEmailAndPassword = (formData, hist) => {
  const { email, password } = formData;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      handleVerification(user.user);
      handleProfileData({
        action: "set",
        user,
        data: basic_user_profile_data(user.user),
      }).then(() => {
        createFriendsList(user.user.uid);
        hist.push("/avatar-select");
      });
    })
    .then(() => hist.push("/avatar-select"))
    .catch((err) => {
      console.log(err);
    });
};
// Sign out
export const signOut = () => auth.signOut();
// Delete user
export const deleteUser = (feedback) => {
  var user = auth.currentUser;
  user.delete().catch((err) => feedback("logout", err.message));
};
