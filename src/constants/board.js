const emptySquares = [null, null, null, null, null, null, null, null, null];

export const bigSquares = {
  topLeft: emptySquares,
  topCenter: emptySquares,
  topRight: emptySquares,
  middleLeft: emptySquares,
  middleCenter: emptySquares,
  middleRight: emptySquares,
  bottomLeft: emptySquares,
  bottomCenter: emptySquares,
  bottomRight: emptySquares,
};

export const smallSquare = {
  image: "",
  squareID: "",
  state: "",
  parent: "",
};

// Three in a row combo template
let top = [0, 1, 2];
let middle = [3, 4, 5];
let bottom = [6, 7, 8];
let x1 = [0, 4, 8];
let x2 = [2, 4, 6];
let left = [0, 3, 6];
let center = [1, 4, 7];
let right = [2, 5, 8];

export const combos = [top, middle, bottom, x1, x2, left, center, right];
