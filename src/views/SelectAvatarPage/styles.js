import { title, fonts } from "assets/jss/material-kit-react";
import tooltip from "assets/jss/tooltipsStyle";

const flexcolumnCenter = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const styles = {
  container: {
    minHeight: "100vh",
    ...flexcolumnCenter,
    paddingTop: 50,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    ...fonts.default,
    fontSize: "calc(15px + 4vmin)",
    margin: 0,
  },
  paper: {
    marginTop: 30,
    width: "95%",
    maxWidth: 600,
    display: "flex",
    justifyContent: "center",
  },
  ...tooltip,
  avatar: {
    fontSize: "calc(15px + 8vmin)",
    margin: "5px 0px 0px 0px",
  },
  gridItem: {
    padding: 3,
  },
};

export default styles;
