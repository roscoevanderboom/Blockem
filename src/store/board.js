/* eslint-disable react/prop-types */
import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useMemo,
} from "react";
// Global store
import store from "store";
// Initial state
import { boardInit } from "./initialState";
// Reducers
import { boardReducer, gameboard_dispatch } from "../reducers/gameRoomsReducer";
// Actions
import { watchGameroom } from "actions/preGame";
// Store
const GameBoardStore = createContext();

export const Provider = (props) => {
  const [gameBoardData, dispatch] = useReducer(boardReducer, boardInit);
  const { userData, setLoading, history, feedback, gameRoomsData } =
    useContext(store);
  const {
    RoomID,
    NextPlayer,
    NextSquare,
    Guest,
    Host,
    InProgress,
    JoinRoomRequests,
  } = gameBoardData;

  const board_state = useMemo(
    () => ({
      gameBoardData,
      dispatch,
    }),
    [gameBoardData, dispatch]
  );

  const whoAmI = Guest.uid === userData.uid ? Guest : Host;

  useEffect(() => {
    if (userData.currentGame) {
      gameRoomsData.currentGames.forEach((room) => {
        if (room.RoomID === userData.currentGame) {
          watchGameroom(
            room.RoomID,
            userData.uid,
            dispatch,
            setLoading,
            history,
            feedback
          );
        }
      });
    }
  }, [userData.currentGame, gameRoomsData.currentGames]);

  useEffect(() => {
    if (InProgress && !NextSquare) {
      gameboard_dispatch("Winner", false, dispatch);
    }
  }, [NextSquare]);

  useEffect(() => {
    if (InProgress && !NextPlayer) {
      gameboard_dispatch("Winner", whoAmI, dispatch);
    }
  }, [InProgress, NextPlayer]);

  useEffect(() => {
    if (JoinRoomRequests !== undefined && whoAmI === Host) {
      JoinRoomRequests.map((request) =>
        feedback(
          "joinRoomRequest",
          request.username + " wants to join your game",
          {
            room: RoomID,
            guest: request,
          }
        )
      );
    }
  }, [JoinRoomRequests]);

  return (
    <GameBoardStore.Provider value={{ ...board_state }}>
      {props.children}
    </GameBoardStore.Provider>
  );
};

export default GameBoardStore;
