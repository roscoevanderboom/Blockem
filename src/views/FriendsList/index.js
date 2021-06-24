import React, { useContext } from "react";
import store from "store";
// Actions
import { removeFriend } from "actions/friendsList";
// @material-ui/core components
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tooltip,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { CloseRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";

const useStyles = makeStyles(styles);

export default function View() {
  const classes = useStyles();
  const { userData } = useContext(store);

  const handleRemoveFriend = (friend) => () => {
    if (window.confirm(`Are you sure you want to remove ${friend.username}`)) {
      removeFriend(userData.uid, friend);
    }
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Friends list</h3>
      <div className={classes.listContainer} component="div">
        <List>
          {userData.friendsList.map((friend, i) => (
            <Paper key={i} className={classes.paper}>
              <ListItem className={classes.listItem}>
                <ListItemText primary={friend.username} />
                <ListItemIcon>
                  <Tooltip
                    title={`Remove ${friend.username}`}
                    placement="left"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="danger"
                      justIcon
                      onClick={handleRemoveFriend(friend)}
                    >
                      <CloseRounded />
                    </Button>
                  </Tooltip>
                </ListItemIcon>
              </ListItem>
            </Paper>
          ))}
        </List>
      </div>
    </div>
  );
}
