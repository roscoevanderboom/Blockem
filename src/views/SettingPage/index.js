import React, { useContext } from "react";
import store from "store";
// Actions
import { signOut } from "actions/auth";
import { handleProfileData } from "actions/userProfiles";
import { handleUsernamesList } from "actions/usernamesList";
// Components
import Button from "components/CustomButtons/Button";

export default function View() {
  const { userData, history, feedback } = useContext(store);
  const handleSignOut = () => {
    if (window.confirm("Are you sure to log out?")) {
      signOut();
    }
  };

  const handleDeleteAccount = () => {
    handleUsernamesList("arrayRemove", userData.displayName);
    handleProfileData({
      action: "delete",
      user: userData.user,
    })
      .then(() => history.push("/delete-reset"))
      .catch((err) => feedback("error", err));
  };

  return (
    <div className="default-page-style">
      <h3>Settings page</h3>
      <div className="settings-page-container">
        <Button color="github" onClick={handleDeleteAccount}>
          Delete Acoount
        </Button>
        <Button color="github" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
