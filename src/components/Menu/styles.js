import { makeStyles } from "@material-ui/core/styles";
import { fonts } from "assets/jss/material-kit-react";
const styles = makeStyles({
  menuIcons: {
    height: "6rem",
    fontSize: "2.5rem",
  },
  settingsTooltip: {
    marginLeft: "0px",
    marginTop: 135,
    backgroundColor: "white",
    color: "inherit",
    ...fonts.default,
    fontSize: "calc(10px + 1vmin)",
  },
  profileTooltip: {
    marginLeft: 30,
    marginTop: 15,
    backgroundColor: "white",
    color: "inherit",
    ...fonts.default,
    fontSize: "calc(10px + 1vmin)",
  },
  gameListTooltip: {
    marginTop: 100,
    backgroundColor: "white",
    color: "inherit",
    ...fonts.default,
    fontSize: "calc(10px + 1vmin)",
  },
});
export default styles;
