export const noGuest = {
  token: { image: "", name: "", adj: "" },
  username: false,
  ready: false,
  uid: "",
};

export const playerData = (userData) => {
  const { uid, displayName, avatar } = userData;
  return {
    token: avatar,
    username: displayName,
    ready: false,
    uid: uid,
  };
};
import { bigSquares } from "../constants/board";
export const newRoom = (host, id, roomData) => ({
  Available: true,
  Guest: noGuest,
  Host: host,
  InProgress: false,
  JoinRoomRequests: [],
  NextPlayer: false,
  NextSquare: false,
  Participants: [host.uid],
  RoomID: id,
  RoomName: roomData.name,
  SquaresPlayed: bigSquares,
  Type: roomData.type,
});

export const newMove = (player, smSquare) => ({
  image: player.token.image,
  square: smSquare.id,
  name: player.token.name,
});
