import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import store from "store";
import board_context from "store/board";
// Actions
import { nextMove } from "actions/gamerooms";
// Styles
import "./styles.css";

export default function SmallSquare(props) {
  const { userData, feedback } = useContext(store);
  const { displayName } = userData;
  const { nextSquare, index, bigSquare, parentProps } = props;
  //
  const { gameBoardData } = useContext(board_context);
  var { RoomID, NextPlayer, Host, Guest, SquaresPlayed, NextSquare } =
    gameBoardData;
  //
  const [image, setImage] = useState("");

  const id = `${bigSquare}#${index}`;
  const whoAmI = Guest.uid === userData.uid ? Guest : Host;

  const handlePlayerMove = () => {
    if (parentProps.restricted || image !== "") {
      feedback(
        "warning",
        "That square is currently closed. Please play in an open square."
      );
      return;
    }

    if (userData.uid !== NextPlayer.uid) {
      feedback("warning", "It's not your turn.");
      return;
    }

    const switchNextPLayer =
      Guest.uid === NextPlayer.uid || NextPlayer.token.image === ""
        ? Host
        : Guest;

    let newMove = {
      squareIndex: index,
      squareID: id,
      image: whoAmI.token.image,
      player: displayName,
    };

    SquaresPlayed[bigSquare][index] = newMove;
    NextSquare = nextSquare;
    NextPlayer = switchNextPLayer;

    let data = {
      NextPlayer,
      NextSquare,
      SquaresPlayed,
    };
    nextMove(RoomID, data);
  };

  useEffect(() => {
    if (SquaresPlayed[bigSquare][index] !== null) {
      setImage(SquaresPlayed[bigSquare][index].image);
    } else {
      setImage("");
    }
  }, [SquaresPlayed[bigSquare]]);

  return (
    <div className="smallSquare" onClick={handlePlayerMove} id={id}>
      {image}
    </div>
  );
}

SmallSquare.propTypes = {
  bigSquare: PropTypes.string,
  nextSquare: PropTypes.string,
  index: PropTypes.number,
  parentProps: PropTypes.object,
};
