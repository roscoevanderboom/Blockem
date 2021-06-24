import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";

const useStyles = makeStyles(styles);

export default function GamesListItem({ room, onClick }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <ListItem button className={classes.listItem} onClick={onClick}>
        <ListItemAvatar>
          <h3>{room.Host.token.image}</h3>
        </ListItemAvatar>
        <ListItemText primary={room.RoomName} secondary={room.Host.username} />
        <ListItemIcon>
          <span className={classes.bodyText}>{room.Type.toUpperCase()}</span>
        </ListItemIcon>
      </ListItem>
    </Paper>
  );
}

GamesListItem.propTypes = {
  room: PropTypes.object,
  onClick: PropTypes.func,
};
