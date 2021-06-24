export const userDataInit = {
  user: null,
  uid: "",
  ready: false,
  displayName: null,
  avatar: {
    image: "",
    name: "",
    adj: "",
  },
  wins: 0,
  losses: 0,
  blockedUsersList: [],
  friendsList: [],
  friendRequests: [],
  usernames: [],
  currentGame: "",
};

export const gameRoomsInit = {
  roomsList: [],
  currentGames: [],
  privateRooms: [],
  activeRoom: false,
};

export const boardInit = {
  Guest: {},
  Host: {},
  InProgress: false,
  NextPlayer: false,
  NextSquare: false,
  OpenBoard: true,
  Participants: [],
  RoomID: false,
  RoomName: false,
  SquaresPlayed: [],
  TitleText: "",
  Type: false,
  Winner: false,
};
