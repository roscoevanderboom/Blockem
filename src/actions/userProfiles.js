/* eslint-disable no-unused-vars */
import { userProfiles } from "../firebase/collections";
import { setProfile } from "reducers/userDataReducer";

export const handleProfileData = ({ action, user, data }) => {
  return new Promise((resolve, reject) => {
    userProfiles
      .doc(user.uid)
      [action](data)
      .then(() => resolve(true))
      .catch((err) => reject(err.message));
  });
};
export const watchProfileData = (user, dispatch_user, setLoading, history) => {
  userProfiles.doc(user.uid).onSnapshot(
    function (doc) {
      if (doc.exists) {
        setProfile(dispatch_user, doc.data());
        setLoading(false);
      } else if (!doc.exists) {
        history.push("/delete-reset");
        setLoading(false);
      }
    },
    function () {
      setLoading(false);
    }
  );
};
export const deleteProfileData = (user) => {
  userProfiles.doc(user.uid).delete();
};
