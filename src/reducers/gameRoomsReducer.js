/* eslint-disable no-unused-vars */
export const gameRoomsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ROOMSLIST":
      return { ...state, roomsList: payload };
    case "SET_ACTIVE_ROOM":
      return { ...state, activeRoom: payload };
    case "SET_CURRENT_GAMES":
      return { ...state, currentGames: payload };
    case "SET_AVAILABLE_ROOMS":
      return { ...state, availableRooms: payload };
    case "SET_PRIVATE_ROOMS":
      return { ...state, privateRooms: payload };
    default:
      break;
  }
};

export const gameboard_dispatch = (key, payload, dispatch) => {
  dispatch({
    type: "SET_ROOM_DATA",
    payload: { [key]: payload },
  });
};

export const boardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ROOM_DATA":
      return { ...state, ...payload };
    default:
      break;
  }
};
