// Images
import select_avatar from "assets/img/how to/select-avatar.jpeg";
import creat_game from "assets/img/how to/create-game.jpeg";
import games_list from "assets/img/how to/games-list.jpeg";
import accept_request from "assets/img/how to/private-room-accept-request.jpeg";
import join_room from "assets/img/how to/private-room-accept-join.jpeg";
import first_move from "assets/img/how to/first-move.jpeg";
import second_move from "assets/img/how to/second-move.jpeg";
import capture_big_square from "assets/img/how to/capture-big-square-1.jpeg";
import prepare_to_win from "assets/img/how to/prepare-to-win.jpeg";
import winner from "assets/img/how to/winner.jpeg";
import next_move_open_board from "assets/img/how to/next-move-open-board.jpeg";
import next_move_open_board1 from "assets/img/how to/next-move-open-board-2.jpeg";

export const howToSteps = [
  {
    title: "Step 1",
    bodyText: "Select your animal avatar",
    image: select_avatar,
  },
  {
    title: "Step 2",
    bodyText: "Create a game. Games can be private or public.",
    image: creat_game,
  },
  {
    title: "Step 3",
    bodyText: "Or join someone else's game.",
    image: games_list,
  },
  {
    title: "Step 4",
    bodyText: "A request will be sent to the host.",
    image: accept_request,
  },
  {
    title: "Step 5",
    bodyText: "You will receive a message if your request is approved.",
    image: join_room,
  },
  {
    title: "Start the game!",
    bodyText: "The guest will always make the first move.",
    image: first_move,
  },
  {
    title: "Next move",
    bodyText:
      "The next player's move on the board, depends on the first player's move in the small square.",
    image: second_move,
  },
  {
    title: "Three in a row",
    bodyText: "To capture a big square, get 3 small squares in a row.",
    image: capture_big_square,
  },
  {
    title: "Win the game",
    bodyText: "To win the game, get 3 big squares in a row.",
    image: prepare_to_win,
  },
  {
    title: "You are the winner!",
    bodyText:
      "Enjoyed playing against you opponent? Add them as a friend or play again!",
    image: winner,
  },
];
export const technicalRules = [
  {
    title: "Opening the board",
    bodyText:
      "If your move directs the next player to a square that is closed, the board will open up",
    image: next_move_open_board,
  },
  {
    title: "Play anywhere",
    bodyText:
      "The next player can now play anywhere on the board, giving them the advantage",
    image: next_move_open_board1,
  },
];
