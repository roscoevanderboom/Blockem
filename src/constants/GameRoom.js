import combos from './Combos';
import { FieldValue } from './firebase/Settings';
import { newMove } from './GameRoomObjects';
import unsubscribeFromActiveRoom from './Unsubscribe';
import { gameRooms } from './firebase/Collections';

const three_in_a_row = (squares) => {
    if (squares.length === 3
        && squares[0] === squares[1]
        && squares[1] === squares[2]) {
        return true;
    };
    return false;
}
const full_square = (squares) => {
    let played = squares.filter(row => row.length === 3);
    if (played.length === 8) {
        return false
    }
    return true;
}
const no_winner = (bigSquares) => {
    let fullSquares = [];
    bigSquares.forEach(sq => {
        if (sq.classList.contains('closed') || sq.classList.contains('full')) {
            fullSquares.push(sq);
            return;
        }
    });
    if (fullSquares.length === 9) {
        console.log('tie');
        return true;
    }
    return false;
}
export const setPlayers = (room, user, setPlayer, setOpponent) => {
    switch (isHost(room, user)) {
        case false:
            setPlayer(room.Guest);
            setOpponent(room.Host);
            break;
        case true:
            setPlayer(room.Host);
            setOpponent(room.Guest);
            break;
        default:
            break;
    }

}
export const isHost = (room, user) => {
    if (room.Host.id === user.uid) {
        return true;
    }
    return false;
}
export const isMoveAllowed = (parent, square, player, opponent) => {
    if (parent.classList.contains('restricted', `${player.token.name}`, `${opponent.token.name}`)
        || square.textContent !== '') {
        return false
    }
    return true
}
export const setSmallSquares = (activeRoom) => {
    activeRoom.SquaresPlayed.forEach(sq => {
        let square = document.getElementById(sq.square);
        if (square !== null) {
            square.textContent = sq.image;
        }
    })
}
export const check_small_squares = (parent) => {
    let children = parent.childNodes;
    let totalSqaures = []

    combos.forEach(combo => {
        let squaresPlayed = [];

        combo.forEach(value => {
            if (children[value] !== undefined
                && children[value].textContent !== "") {
                squaresPlayed.push(children[value].textContent);
            }
        })

        if (three_in_a_row(squaresPlayed)) {
            parent.textContent = squaresPlayed[0];
            parent.className = `closed ${squaresPlayed[0]}`;
        }
        totalSqaures.push(squaresPlayed);
    })
    if (!full_square(totalSqaures)) {
        parent.classList.add(`full`);
    }
}
export const check_big_squares = (bigSquares, activeRoom) => {
    combos.forEach(combo => {
        let squaresPlayed = [];
        combo.forEach(value => {
            if (bigSquares[value].childNodes.length === 1) {
                squaresPlayed.push(bigSquares[value].textContent);
                return
            }
        })
        if (three_in_a_row(squaresPlayed)) {
            handleWinner(squaresPlayed[0], activeRoom);
        }
    })
}
export const setRestrictions = (bigSquares, winner, activeRoom) => {
    let nextSquare = document.getElementById(activeRoom.NextSquare);

    if (nextSquare !== null) {
        // Close all squares if there is a winner
        if (winner) {
            bigSquares.forEach(sq => {
                sq.classList.add('restricted');
            });
            return;
        }
        // If the next square is full, open all other available squares
        if (no_winner(bigSquares)) {
            handleWinner('tie', activeRoom);
            return;
        }

        // If the next square is closed or full, open all other available squares
        if (nextSquare.classList.contains('closed') || nextSquare.classList.contains('full')) {
            bigSquares.forEach(sq => {
                if (sq !== nextSquare) {
                    sq.classList.remove('restricted');
                }
            });
            return;
        }

        // Remove restriction from the next square to be played in
        bigSquares.forEach(sq => {
            if (sq === nextSquare) {
                sq.classList.remove('restricted');
                return;
            } else if (!sq.classList.contains('closed')) {
                sq.classList.add('restricted');
            }
        });
    }
}
export const playerMove = (e, activeRoom, user, player, opponent, handleErrors) => {
    if (activeRoom.NextPlayer.id === user.uid) {
        let parent = e.target.parentElement;
        let smSquare = e.target;
        let nextSquareId = smSquare.id.slice(0, smSquare.id.indexOf('-'));

        if (!isMoveAllowed(parent, e.target, player, opponent)) {
            handleErrors('That move is not allowed');
            return;
        }

        let move = newMove(player, smSquare);

        gameRooms.doc(activeRoom.RoomID).update({
            NextPlayer: opponent,
            SquaresPlayed: FieldValue.arrayUnion(move),
            NextSquare: nextSquareId + '-lg'
        }).catch((err) => {
            console.log(err.message);
        })
        return;
    }
    handleErrors('Sorry. Not your turn');
}
export const handleWinner = (winner, activeRoom) => {
    gameRooms.doc(activeRoom.RoomID).update({ Winner: winner })
}
export const handleLeaveGame = (activeRoom, setActiveRoom, history) => {
    if (!activeRoom.Winner) {
        console.log("your account will be deleted if you leave early");
    }
    gameRooms.doc(activeRoom.RoomID).delete()
        .then(() => unsubscribeFromActiveRoom(gameRooms, activeRoom.RoomID, setActiveRoom, history));
}