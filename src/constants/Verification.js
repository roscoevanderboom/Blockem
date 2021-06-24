import { combos } from "./board";
import { gameboard_dispatch } from "reducers/gameRoomsReducer";
export const check_big_squares = (gameboard, Host, Guest, dispatch) => {
  let closedSquares = [];
  combos.forEach((combo) => {
    let squaresOwned = [];
    combo.forEach((value) => {
      //  If the big square has been taken
      if (gameboard.childNodes[value].childNodes.length === 1) {
        if (!squaresOwned.includes(gameboard.childNodes[value].childNodes[0])) {
          squaresOwned.push(gameboard.childNodes[value].childNodes[0]);
        }
        if (!closedSquares.includes(gameboard.childNodes[value].id)) {
          closedSquares.push(gameboard.childNodes[value].id);
        }
      }
      //  If the big square has had all squares played but no winner
      if (gameboard.childNodes[value].childNodes.length === 9) {
        let nodeContent = [];
        gameboard.childNodes[value].childNodes.forEach((node) => {
          if (node.textContent !== "") {
            nodeContent.push(node.textContent);
          }
        });
        if (nodeContent.length === 9) {
          if (!closedSquares.includes(gameboard.childNodes[value].id)) {
            closedSquares.push(gameboard.childNodes[value].id);
          }
        }
      }
    });
    if (squaresOwned.length === 3) {
      if (
        squaresOwned[0] !== undefined &&
        squaresOwned[0].textContent === squaresOwned[1].textContent &&
        squaresOwned[1].textContent === squaresOwned[2].textContent
      ) {
        let winner = {};
        if (squaresOwned[0].textContent === Host.token.image) {
          winner = Host;
        } else {
          winner = Guest;
        }
        gameboard_dispatch("Winner", winner, dispatch);
        return;
      }
    }
  });
  if (closedSquares.length === 9) {
    gameboard_dispatch("Winner", "no winner", dispatch);
  }
};

export const check_small_squares = (
  SquaresPlayed,
  NextSquare,
  bigSquare,
  handleSquareProps,
  dispatch
) => {
  let unMatchedCombos = [];
  combos.forEach((combo) => {
    let arr = [];
    combo.forEach((value) => {
      if (SquaresPlayed[bigSquare][value] !== null) {
        arr.push(SquaresPlayed[bigSquare][value]);
      }
    });
    if (arr.length === 3) {
      let images = arr.map((sq) => sq.image);
      if (images[0] === images[1] && images[1] === images[2]) {
        handleSquareProps({
          restricted: true,
          owner: arr[0].image,
        });
      } else {
        unMatchedCombos.push(arr);
      }
    }
  });
  if (unMatchedCombos.length === 8 && NextSquare === bigSquare) {
    gameboard_dispatch("OpenBoard", true, dispatch);
  }
};
