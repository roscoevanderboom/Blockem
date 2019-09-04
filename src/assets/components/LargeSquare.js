import React from 'react';

// Constants
import Combos from '../constants/Combos'
import updateArray from '../constants/UpdateArray'

function LargeSquare({ props, id }) {

    const { state, firestore, board } = props;
    const { gameRoom, player, opponent } = state;
    const { lg, sm } = board;

    let squaresPlayed = [];

    const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9,]

    const checkThreeInARow = (sq, num) => {
        let values = [];
        console.log(sq[0].parentElement);

        Combos.forEach(combo => {
            // console.log(combo);
            // console.log(num)
        })

        // if (sq[num - 1].textContent === sq[num].textContent && sq[num].textContent === sq[num + 1].textContent) {
        //     console.log('Matched' + sq[num - 1].id + ', ' + sq[num].id + ', ' + sq[num + 1].id)
        //     sq[num - 1].style.backgroundColor = 'red';
        //     sq[num].style.backgroundColor = 'red';
        //     sq[num + 1].style.backgroundColor = 'red';
        // }
    }
    const checkForWinner = (sq) => {
        // let arr = arrayOfNumbers(82);
        // let squaresPlayed = [];
        // arr.forEach(num => {           
        //     if (sq[num - 1].textContent !== '') {
        //         console.log(sq[num - 1].id + ': '+ sq[num - 1].textContent);
        //         squaresPlayed.push(sq[num - 1]);
        //         // checkThreeInARow(sq, num)
        //     }
        // })

        // div.forEach((sq, i) => {
        //     if (token[i] === token[i + 1] && token[i + 1] === token[i + 2]) {
        //         console.log('Three in a row');
        //         return;
        //     }
        // })

    }

    const canIPlayHere = (square) => {
        let result;
        square.textContent !== '' ? result = false : result = true;
        return result
    }

    const play = (square) => {
        
        if (!(canIPlayHere(square)) || gameRoom.PlayerToMove !== player.id) {
            alert(`Sorry. That move is not allowed`)
            return;
        }
        let moves = squaresPlayed;
        let cls = square.classList.value.slice(0, 3)
        let parent = square.parentElement;
        let children = parent.getElementsByClassName('smallSquare')
        let sqID = parent.id + '-' + cls;

        updateArray(squaresPlayed, sqID)
        
            
        // firestore.gameRooms.doc(gameRoom.ID).update({
        //     PlayerToMove: opponent.id,
        //     [sqID]: {
        //         played: true,
        //         player: player.id,
        //         token: player.token[0]
        //     }
        // });
    }

    console.log(lg);
    console.log(sm);
    return (
        <React.Fragment>
            <section id={id} className="grid largeSquare">
                {squares.map(val =>
                    <div key={val} className={`sm${val} smallSquare`} onClick={(e) => {
                        if( !e ) e = window.event; 
                       
                        play(e.target)
                    }}></div>)}
            </section>
        </React.Fragment>
    )
}

export default LargeSquare;