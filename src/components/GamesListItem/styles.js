import { fonts, boxShadow } from "assets/jss/material-kit-react";

const styles = {
  bodyText: {
    ...fonts.secondary,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paper: {
    marginBottom: 30,
    transition: "box-shadow 500ms",
    "&:hover": { ...boxShadow },
  },
};

export default styles;
