import { makeStyles } from "@material-ui/core/styles";
import { flex } from "../../assets/jss";

const useStyles = makeStyles((theme) => ({
  margin: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    ...flex.flex_column_center,
    alignItems: "center",
    width: "95%",
    maxWidth: 400,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default useStyles;
