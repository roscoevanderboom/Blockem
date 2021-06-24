/* eslint-disable react/display-name */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import classnames from "classnames";
import { useSnackbar, SnackbarContent } from "notistack";
// Actions
import { signOut } from "actions/auth";
import { acceptJoinRoomRequest } from "actions/preGame";
import { handleProfileData } from "actions/userProfiles.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card, CardActions, Typography } from "@material-ui/core";
// @material-ui/icons
// core components

import styles from "./snackbarContentStyle.js";

const useStyles = makeStyles(styles);

const DefaultSnackbar = React.forwardRef((props, ref) => {
  const { key } = props;
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = () => {
    closeSnackbar(props.id);
  };

  const handleJoinRoom = () => {
    handleProfileData({
      action: "update",
      user: props.data.userData.user,
      data: { currentGame: props.data.game.RoomID },
    }).then(() => closeSnackbar(props.id));
  };

  const handleAcceptJoinRoomRequest = () => {
    acceptJoinRoomRequest(props.request);
    closeSnackbar(props.id);
  };

  const handleSignOut = () => {
    closeSnackbar(props.id);
    signOut();
  };

  return (
    <SnackbarContent id={key} ref={ref} className={classnames(classes.root)}>
      <Card
        square
        className={classnames(classes.container, classes[props.variant])}
      >
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="subtitle2" className={classes.message}>
            {props.message}
          </Typography>

          {props.variant === "joinRoomRequest" && (
            <IconButton
              className={classes.expand}
              onClick={handleAcceptJoinRoomRequest}
            >
              <i className="far fa-check-circle"></i>
            </IconButton>
          )}

          {props.variant === "joinRoom" && (
            <IconButton className={classes.expand} onClick={handleJoinRoom}>
              <i className="far fa-check-circle"></i>
            </IconButton>
          )}
          {props.variant === "logout" && (
            <IconButton className={classes.expand} onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt"></i>
            </IconButton>
          )}
          <IconButton className={classes.expand} onClick={handleDismiss}>
            <i className="far fa-window-close text-light"></i>
          </IconButton>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

DefaultSnackbar.propTypes = {
  key: PropTypes.string,
  id: PropTypes.number,
  request: PropTypes.object,
  data: PropTypes.object,
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "info",
    "success",
    "warning",
    "error",
    "logout",
    "joinRoomRequest",
    "joinRoom",
  ]),
  close: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DefaultSnackbar;
