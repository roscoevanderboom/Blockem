import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/favicons/monkey-wearing-a-cap-512-247295.png";

export default function Loader(props) {
  const { loading } = props;
  return (
    loading && (
      <div className="loader-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  );
}

Loader.propTypes = {
  loading: PropTypes.bool,
};
