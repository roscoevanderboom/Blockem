import { usernames } from "../firebase/collections";
import { FieldValue } from "../firebase";

export const handleUsernamesList = (key, value) => {
  usernames.doc("registered-names").update({
    names: FieldValue[key](value),
  });
};

export const getUsernamesList = (dispatch) => {
  usernames.doc("registered-names").onSnapshot((doc) => {
    dispatch({
      type: "SET_USERNAMES_LIST",
      payload: doc.data().names,
    });
  });
};
