import React, { useEffect } from 'react';

// Constants
import Combos from '../constants/Combos'

function LargeSquare({ props, id }) {

    const { state, firestore, bigSquares } = props;
    const { gameRoom, player, opponent } = state;


    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const checkThreeInARow = (parent, square) => {
        let currentSquare = square.id.slice(0, -1)
        let text = [];

        parent.childNodes.forEach(val => text.push(val.textContent));
        // Combos.forEach(combo => {
        //     let values = []
        //     combo.forEach(val => {
        //         if (text[val] !== '') {
        //             values.push(text[val])
        //             return;
        //         }
        //     });

        //     if (values.length > 0 && values[0] === values[1] && values[1] === values[2]) {
        //         console.log(values);
        //         console.log(currentSquare);
        //         return;
        //     }
        // })
    }

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
        if (!(canIPlayHere(square, parent)) || gameRoom.PlayerToMove !== player.id) {
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
            PlayerToMove: opponent.id,
            SquaresPlayed: moves,
            NextSquare: square.id.slice(square.id.indexOf('-') + 1)
        })
        checkThreeInARow(parent, square)
    }

    useEffect(() => {

    })


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