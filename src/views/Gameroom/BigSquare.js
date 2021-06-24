import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// Store
import board_context from "store/board";
import { gameboard_dispatch } from "reducers/gameRoomsReducer";
// Constants
import { bigSquares } from "constants/board";
// Verification
import { check_small_squares } from "constants/verification";
// Components
import SmallSquare from "./SmallSquare";
// Styles
import "./styles.css";

export default function BigSquare(props) {
  const { id, bigSquare } = props;
  const { gameBoardData, dispatch } = useContext(board_context);
  const { RoomID, OpenBoard, SquaresPlayed, NextSquare } = gameBoardData;
  // State
  const [classNames, setClassNames] = useState("grid");
  const [squareProps, setSquareProps] = useState({
    restricted: false,
    owner: false,
  });

  const handleSquareProps = (value) => {
    setSquareProps({ ...squareProps, ...value });
  };

  useEffect(() => {
    if (!NextSquare) {
      handleSquareProps({
        restricted: false,
        owner: false,
      });
    }
  }, [NextSquare]);

  useEffect(() => {
    if (RoomID && NextSquare) {
      // Check big square state
      if (squareProps.owner && NextSquare === bigSquare) {
        setClassNames("grid closed");
        gameboard_dispatch("OpenBoard", true, dispatch);
      } else if (squareProps.owner && NextSquare !== bigSquare) {
        setClassNames("grid closed");
      } else if (!squareProps.owner && NextSquare === bigSquare) {
        setClassNames("grid");
        gameboard_dispatch("OpenBoard", false, dispatch);
      } else if (!squareProps.owner && NextSquare !== bigSquare && !OpenBoard) {
        setClassNames("grid restricted");
      } else if (!squareProps.owner && NextSquare !== bigSquare && OpenBoard) {
        setClassNames("grid");
      } else if (!squareProps.owner && OpenBoard) {
        setClassNames("grid");
      }
    } else if (RoomID && !NextSquare) {
      setClassNames("grid");
      gameboard_dispatch("OpenBoard", true, dispatch);
    }
  }, [NextSquare, squareProps, OpenBoard]);

  useEffect(() => {
    if (classNames.includes("restricted")) {
      handleSquareProps({
        restricted: true,
      });
    } else if (classNames === "grid") {
      handleSquareProps({
        restricted: false,
      });
    }
  }, [classNames]);

  useEffect(() => {
    check_small_squares(
      SquaresPlayed,
      NextSquare,
      bigSquare,
      handleSquareProps,
      dispatch
    );
  }, [SquaresPlayed]);

  return (
    <div id={id} className={classNames}>
      {squareProps.owner
        ? squareProps.owner
        : Object.keys(bigSquares).map((smSQ, i) => (
            <SmallSquare
              key={i}
              index={i}
              nextSquare={smSQ}
              bigSquare={bigSquare}
              parentProps={squareProps}
            />
          ))}
    </div>
  );
}

BigSquare.propTypes = {
  id: PropTypes.string,
  bigSquare: PropTypes.string,
};
