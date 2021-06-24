export const setProfile = (dispatch_user, data) => {
  dispatch_user({
    type: "SET_PROFILE",
    payload: data,
  });
};

export const userDataReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_PROFILE":
      return { ...state, ...payload };
    case "SET_USERNAMES_LIST":
      return { ...state, usernames: payload };
    default:
      break;
  }
};
