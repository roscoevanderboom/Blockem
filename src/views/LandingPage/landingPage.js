import { container, title, fonts } from "assets/jss/material-kit-react";

const text = {
  display: "inline-block",
  position: "relative",
  marginTop: 0,
  minHeight: "32px",
  color: "#FFFFFF",
  textDecoration: "none",
};

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerContainer: {
    width: "100%",
    backgroundImage: "url('https://source.unsplash.com/featured/?animals')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  section: {
    backgroundColor: "#282c34",
  },
  title: {
    ...title,
    ...fonts.default,
    ...text,
    fontSize: "calc(15px + 4vmin)",
  },
  secondaryTitle: {
    ...fonts.secondary,
    ...text,
    fontSize: "calc(10px + 3vmin)",
  },
  howTo: {
    marginBottom: 100,
    padding: "30px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  howToImages: {
    width: "100%",
    height: "auto",
    marginBottom: 25,
  },
  bodyText: {
    ...fonts.secondary,
    color: "#FFFFFF",
    fontSize: "calc(15px + 1vmin)",
  },
};

export default landingPageStyle;
