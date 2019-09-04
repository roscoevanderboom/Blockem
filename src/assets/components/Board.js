import React, { useState, useEffect } from 'react';

// Components
import LargeSquare from './LargeSquare'

// Styles
import './styles/Board.css';

function Board({ props }) {

    const { state, firestore } = props;
    const { gameRoom } = state;

    const times = [5, 10, 15, 20, 25, 30];

    let hostIcon = 'Host';
    let guestIcon = 'Guest';
    let playerToMove = '';
    // let squaresPlayed = [];

    const arrayOfNumbers = (number) => {
        let array = [];
        for (let i = 1; i < number; i++) {
            array.push(i)
        }
        return array;
    }

    const setTheBoard = (sqPlayed) => {
        let lg = document.getElementsByClassName('largeSquare');
        let sq = lg.getElementsByClassName('smallSquare');

        // if (sq !== undefined) {
        //     let div = sqPlayed.map(sq => sq.id);
        //     // let player = sqPlayed.map(pl => pl.player);
        //     let token = sqPlayed.map(to => to.token);

        //     div.forEach((id, i) => {
        //         let index = id.slice(2)
        //         sq[index - 1].textContent = token[i];
        //     });
        // }
    }
    const leaveRoom = () => {
        firestore.gameRooms.doc(gameRoom.ID).set({
            Available: false
        });
    }

    useEffect(() => {

    })


    const LargeSquareProps = {
        state: state,
        board: {
            // lg: largeSQ,
            // sm: smallSQ,
        },
        firestore: firestore
    }

    if (!(gameRoom)) {
        return (
            <React.Fragment>
                Loading...
            </React.Fragment>
        );
    }

    if (gameRoom !== false) {
        hostIcon = gameRoom.Host.token[0];
        guestIcon = gameRoom.Guest.token[0]
        playerToMove = gameRoom.PlayerToMove;
        // squaresPlayed = gameRoom.SquaresPlayed
        console.log(gameRoom.SquaresPlayed)
        // setTheBoard(gameRoom.SquaresPlayed)
        return (
            <React.Fragment>
                <div className="fadeIn" id="boardModal">
                    <div id="playerBar">
                        <div className="simpleFlex col-3">{hostIcon}</div>
                        <select id="counter" className="form-control col-3"
                            onChange={(e) => {
                                alert('coming soon')
                                console.log(e.target.value)
                            }}>

                            {times.map((time, i) =>
                                <option key={i} value={`${time}`}>{`${time} secs`}</option>)}
                        </select>
                        <div className="simpleFlex col-3">{guestIcon}</div>
                    </div>

                    <section className="grid board">
                        <h3>board </h3>
                    </section>
                    {playerToMove}
                    <button type="button" className="btn btn-primary" onClick={leaveRoom}>Leave room</button>

                </div>
            </React.Fragment>
        )
    }





}

export default Board;


// {arrayOfNumbers(10).map((val, i) =>
//     <LargeSquare key={val} id={`lg${val}`} props={LargeSquareProps} />)}