import React, { useContext } from "react";
import store from "store";
// Componets
import { Grid } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
// Action
import { handleProfileData } from "actions/userProfiles";
import { deleteUser } from "actions/auth";
// Constants
import { basic_user_profile_data } from "constants/userProfileData";

export default function View() {
  const { userData, history, feedback } = useContext(store);

  const handleDeleteUserAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(feedback);
    }
  };

  const handleRestartProfile = () => {
    handleProfileData({
      action: "set",
      user: userData.user,
      data: basic_user_profile_data(userData.user),
    }).then(() => history.push("/profile"));
  };

  return (
    <div className="default-page-style">
      <div className="default-page-container">
        <h3>You do not have any profile data.</h3>
        <br />
        <h5>Would you like to delete your account or restart your profile?</h5>
        <br />
        <br />
        <Grid container justify="center">
          <Grid item xs={12}>
            <Button color="danger" onClick={handleDeleteUserAccount}>
              Delete
            </Button>
            <span> or </span>
            <Button color="success" onClick={handleRestartProfile}>
              Restart
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
