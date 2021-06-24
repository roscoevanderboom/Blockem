import React, { useState, useContext } from "react";
import store from "store";
// Components
import CustomInput from "components/CustomInput/CustomInput";
import { ControlledFadeDialog } from ".";
// Actions
// eslint-disable-next-line no-unused-vars
import { handleProfileData } from "../../actions/userProfiles";
import { handleUsernamesList } from "../../actions/usernamesList";

export const ChangeDisplayNameDialog = () => {
  const { userData, feedback, loading } = useContext(store);
  const [name, setName] = useState("");
  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (userData.usernames.includes(name)) {
      feedback("info", "Sorry. That username is not available.");
    } else {
      handleUsernamesList("arrayUnion", name);
      handleProfileData({
        action: "update",
        user: userData.user,
        data: { displayName: name },
      })
        .then(() => handleUsernamesList("arrayUnion", name))
        .catch(() =>
          handleProfileData({
            action: "set",
            user: userData.user,
            data: { displayName: name },
          })
        );
    }
  };

  return (
    <ControlledFadeDialog
      open={userData.displayName === null && !loading}
      title="Change your display name."
      handleSubmit={handleSubmit}
      bodyContent={
        <CustomInput
          labelText="Display name"
          id="displayname"
          error={name === ""}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: "text",
            onChange: (e) => handleInput(e),
          }}
        />
      }
    />
  );
};
