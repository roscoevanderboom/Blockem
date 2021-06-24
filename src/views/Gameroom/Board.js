import React, { useEffect, useContext } from "react";
// Store
import board_context from "store/board";
// Constants
import { bigSquares } from "constants/board";
// Verification
import { check_big_squares } from "constants/verification";
// Components
import BigSquare from "./BigSquare";
// Styles
import "./styles.css";

export default function GameBoard() {
  const { gameBoardData, dispatch } = useContext(board_context);
  const { Winner, Host, Guest, NextSquare } = gameBoardData;

  let gameboard = document.getElementById("gameboard");

  useEffect(() => {
    if (gameboard !== null && !Winner && NextSquare) {
      check_big_squares(gameboard, Host, Guest, dispatch);
    }
  }, [gameBoardData]);

  return (
    <section id="gameboard" className="grid board">
      {Object.keys(bigSquares).map((square, i) => (
        <BigSquare key={i} id={"lg-" + square} bigSquare={square} />
      ))}
    </section>
  );
}
