export const basic_user_profile_data = (user) => ({
  currentGame: false,
  uid: user.uid,
  ready: false,
  displayName: user.isAnonymous ? "Anonymous" : null,
  avatar: {
    image: "",
    name: "",
    adj: "",
  },
  wins: 0,
  losses: 0,
  blockedUsersList: [],
});
