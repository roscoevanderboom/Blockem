import React from 'react';

function LargeSquare({ props, id }) {

    const { state, firestore, bigSquares } = props;
    const { gameRoom, player, opponent } = state;

    const canIPlayHere = (square, parent) => {
        let result = true;       
        if (parent.classList.value.includes('restricted') || square.textContent !== '') {
            result = false;
            return;
        }
        return result
    }

    const play = (square) => {
        let parent = square.parentElement;
        if (!(canIPlayHere(square, parent)) || gameRoom.PlayerToMove !== player.token[0]) {
            alert(`Sorry. That move is not allowed`)
            return;
        }
        let moves = gameRoom.SquaresPlayed;

        let newMove = {
            player: player.id,
            token: player.token[0],
            square: square.id
        }

        moves.push(newMove);
        square.textContent = player.token[0];

        firestore.gameRooms.doc(gameRoom.ID).update({
            PlayerToMove: opponent.token[0],
            SquaresPlayed: moves,
            NextSquare: square.id.slice(square.id.indexOf('-') + 1)
        })        
    }

    return (
        <React.Fragment>
            <section id={id} className="grid largeSquare">
                {bigSquares.map(val =>
                    <div key={val} id={`${id}-${val}`} className={`smallSquare`} onClick={(e) => {
                        if (!e) e = window.event;
                        play(e.target)
                    }}></div>)}
            </section>
        </React.Fragment>
    )
}

export default LargeSquare;