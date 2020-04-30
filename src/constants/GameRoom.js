import combos from './Combos';

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
const setSmallSquares = (activeRoom) => {
    activeRoom.SquaresPlayed.forEach(sq => {
        let square = document.getElementById(sq.square);
        if (square !== null) {
            square.textContent = sq.image;
        }
    })
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
export const check_big_squares = (bigSquares, setWinner) => {
    combos.forEach(combo => {
        let squaresPlayed = [];
        combo.forEach(value => {
            if (bigSquares[value].childNodes.length === 1) {
                squaresPlayed.push(bigSquares[value].textContent);
                return
            }
        })
        if (three_in_a_row(squaresPlayed)) {
            setWinner(squaresPlayed[0]);
        }
    })
}
export const setBoard = (bigSquares, winner, activeRoom, setWinner) => {
    let nextSquare = document.getElementById(activeRoom.NextSquare);

    if (nextSquare !== null) {
        setSmallSquares(activeRoom);

        // Close all squares if there is a winner
        if (winner) {
            bigSquares.forEach(sq => {
                sq.classList.add('restricted');
            });
            return;
        }
        // If the next square is full, open all other available squares
        if (no_winner(bigSquares)) {
            setWinner('tie');
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
export const isMoveAllowed = (parent, square, player, opponent) => {
    if (parent.classList.contains('restricted', `${player.token.name}`, `${opponent.token.name}`)
        || square.textContent !== '') {
        return false
    }
    return true
} 