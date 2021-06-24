import React, { useState, useContext } from "react";
import store from "store";
// Components
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import { SlideDialog } from ".";
// Actions
import { createGameRoom } from "actions/preGame";

export const CreateGameroomDialog = () => {
  const { userData, feedback, setLoading } = useContext(store);
  const [open, setOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
  });

  const handleOpen = () => {
    if (userData.user.isAnonymous) {
      feedback("info", "This feature is only available to registered users.");
    } else if (!userData.user.emailVerified) {
      feedback(
        "info",
        "Your account has not been verified. Please check more email."
      );
    } else {
      setOpen(!open);
    }
  };

  const handleInput = (key, value) => {
    setRoomData({ ...roomData, [key]: value });
  };

  const handleSubmit = () => {
    if (roomData.name === "") {
      feedback("error", "Please enter a room name");
    } else if (roomData.type === "") {
      feedback("error", "Please select a room type");
    } else {
      if (userData.user !== null && userData.user.isAnonymous) {
        feedback("info", "This feature is only available to registered users.");
      } else if (userData.user !== null && !userData.user.isAnonymous) {
        setLoading(true);
        createGameRoom(userData, roomData);
        handleOpen();
      }
    }
  };

  return (
    <>
      <SlideDialog
        open={open}
        title="Gameroom options."
        handleOpen={handleOpen}
        handleSubmit={handleSubmit}
        trigger={
          <Button color="facebook" onClick={handleOpen}>
            Create
          </Button>
        }
        bodyContent={
          <div>
            <CustomInput
              labelText="Room name"
              id="room-name"
              error={roomData.name === ""}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "text",
                onChange: (e) => handleInput("name", e.target.value),
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="room-type-select-label">Set room type</InputLabel>
              <Select
                labelId="room-type-select-label"
                id="room-type-select"
                value={roomData.type}
                onChange={(e) => handleInput("type", e.target.value)}
              >
                <MenuItem value={"private"}>Private</MenuItem>
                <MenuItem value={"public"}>Public</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
      />
    </>
  );
};
