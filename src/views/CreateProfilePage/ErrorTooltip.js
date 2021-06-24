import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { Tooltip, List } from "@material-ui/core";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import tooltipStyles from "assets/jss/tooltipsStyle";
const useStyles = makeStyles({
  ...tooltipStyles,
  tooltipUL: {
    padding: 0,
    margin: 0,
  },
  tooltipLI: {
    listStyle: "none",
  },
});

export default function ErrorTooltip(props) {
  const classes = useStyles();
  const { password, passwordErrors } = props;

  const [tooltip, setTooltip] = React.useState(false);

  const Errors = () => (
    <List className={classes.tooltipUL}>
      {passwordErrors.map((err, i) => (
        <li key={i} className={classes.tooltipLI}>
          {err}
        </li>
      ))}
    </List>
  );

  React.useEffect(() => {
    if (password === "") {
      setTooltip(false);
    } else if (passwordErrors.length > 0) {
      setTooltip(true);
      return;
    }
    setTooltip(false);
  }, [passwordErrors, password]);

  return (
    <Tooltip
      placement="top"
      open={tooltip}
      title={<Errors />}
      classes={{ tooltip: classes.tooltip }}
    >
      {props.children}
    </Tooltip>
  );
}

ErrorTooltip.propTypes = {
  password: PropTypes.string,
  passwordErrors: PropTypes.array,
  handleData: PropTypes.func,
  children: PropTypes.element,
};
