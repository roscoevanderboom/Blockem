import React, { createContext, useReducer, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// // Actions
import { handleUserAuth } from "actions/auth";
import { watchProfileData } from "actions/userProfiles";
import { getUsernamesList } from "actions/usernamesList";
import { fetchGamerooms } from "actions/preGame";
import { watchFriendsList } from "actions/friendsList";
// Feedback
import { useSnackbar } from "notistack";
import { createFeedback } from "../components/Feedback/index";
// Initial state
import { userDataInit, gameRoomsInit } from "./initialState";
// Reducers
import { gameRoomsReducer } from "../reducers/gameRoomsReducer";
import { userDataReducer } from "../reducers/userDataReducer";
// Constants
import { basic_user_profile_data } from "constants/userProfileData";
// Store
const AppStore = createContext();

export const Provider = (props) => {
  const history = useHistory();
  const [userData, dispatch_user] = useReducer(userDataReducer, userDataInit);
  const [gameRoomsData, dispatch_gameRooms] = useReducer(
    gameRoomsReducer,
    gameRoomsInit
  );
  const { currentGames, roomsList } = gameRoomsData;
  const { currentGame, user } = userData;
  // Loading
  const [loading, setLoading] = useState(true);
  // Methods for user feedback
  const { enqueueSnackbar } = useSnackbar();
  const feedback = (variant, message, data) => {
    createFeedback(variant, message, enqueueSnackbar, data);
  };

  const userNotNull = user !== null;
  const userIsAnonymous = user !== null && user.isAnonymous;

  // Handle Auth signin and get the list of usernames
  useEffect(() => {
    handleUserAuth(history, dispatch_user, setLoading);
    getUsernamesList(dispatch_user);
  }, []);
  // If user is logged in, get data and check room for current games
  useEffect(() => {
    if (userNotNull && !userIsAnonymous) {
      watchProfileData(user, dispatch_user, setLoading, history);
      fetchGamerooms(user.uid, dispatch_gameRooms);
      watchFriendsList(user.uid, dispatch_user);
    } else if (userNotNull && userIsAnonymous) {
      dispatch_user({
        type: "SET_PROFILE",
        payload: basic_user_profile_data(user),
      });
      fetchGamerooms(user.uid, dispatch_gameRooms);
      setLoading(false);
    }
  }, [user]);
  // If user is logged in, get data and check room for current games
  useEffect(() => {
    currentGames.forEach((game) => {
      if (
        game.RoomID !== currentGame &&
        userData.uid !== game.Host.uid &&
        game.Type === "private"
      ) {
        feedback("joinRoom", "Would you like to join " + game.RoomName, {
          userData,
          game,
        });
      }
    });
  }, [currentGames, currentGame]);
  // Go to gameroom if there is an active game
  useEffect(() => {
    if (currentGame) {
      dispatch_gameRooms({
        type: "SET_ACTIVE_ROOM",
        payload: currentGame,
      });
      history.push("/gameRoom");
    }
  }, [currentGame]);

  return (
    <AppStore.Provider
      value={{
        userData,
        dispatch_user,
        gameRoomsData,
        dispatch_gameRooms,
        history,
        feedback,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </AppStore.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element,
};

export default AppStore;
