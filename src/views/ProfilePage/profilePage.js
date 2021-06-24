import { container, title } from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/imagesStyles.js";

const profilePageStyle = {
  container: {
    ...container,
    paddingBottom: 20,
  },
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
    },
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important",
  },
  name: {
    marginTop: "-80px",
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
  },
  mainRaised: {
    margin: "20vh 0px",
    borderRadius: "6px",
    width: "95%",
    maxWidth: 600,
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999",
  },
  body: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-around",
  },
  playerAvatar: {
    fontSize: "calc(4rem + 4vmin)",
    marginBottom: 40,
  },
};

export default profilePageStyle;
