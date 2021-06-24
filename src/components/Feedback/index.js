/* eslint-disable react/display-name */
import React from "react";
import DefaultSnackbar from "../Snackbar/SnackbarContent";

export const createFeedback = (variant, message, enqueueSnackbar, data) => {
  switch (variant) {
    case "success":
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
      });
      break;
    case "info":
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
      });
      break;
    case "joinRoomRequest":
      enqueueSnackbar(message, {
        autoHideDuration: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        content: (key) => (
          <DefaultSnackbar
            id={key}
            message={message}
            variant={variant}
            request={data}
          />
        ),
      });
      break;
    case "joinRoom":
      enqueueSnackbar(message, {
        autoHideDuration: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        content: (key) => (
          <DefaultSnackbar
            id={key}
            message={message}
            variant={variant}
            data={data}
          />
        ),
      });
      break;
    case "warning":
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
      });
      break;
    case "error":
      enqueueSnackbar(message, {
        variant,
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      break;
    case "logout":
      enqueueSnackbar(message, {
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
        autoHideDuration: null,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      break;
    default:
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: null,
        content: (key) => (
          <DefaultSnackbar id={key} message={message} variant={variant} />
        ),
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      break;
  }
};
