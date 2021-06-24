import { title, fonts } from "assets/jss/material-kit-react";
import tooltip from "assets/jss/tooltipsStyle";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: 0,
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    ...fonts.default,
    fontSize: "calc(15px + 3vmin)",
  },
  bodyText: {
    ...fonts.secondary,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "95%",
    maxWidth: 600,
  },
  paper: {
    marginBottom: 30,
  },
  ...tooltip,
};

export default styles;
