import React, { useEffect } from 'react';

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

    const bigSquares = [
        'TopLeft',
        'TopCenter',
        'TopRight',
        'MiddleLeft',
        'MiddleCenter',
        'MiddleRight',
        'BottomLeft',
        'BottomCenter',
        'BottomRight',
    ]

    const setTheBoard = () => {
        if (gameRoom.NextSquare !== 'Any') {
            bigSquares.forEach((sq) => {
                if (sq === gameRoom.NextSquare) {
                    document.getElementById(gameRoom.NextSquare).classList.remove('restricted');
                    return;                
                }
                document.getElementById(sq).classList.add('restricted');
            });
            gameRoom.SquaresPlayed.forEach(val => {
                let playedSQ = document.getElementById(val.square);
                playedSQ.textContent = val.token;
            });           
        }        
    }

    const leaveRoom = () => {
        firestore.gameRooms.doc(gameRoom.ID).set({
            Available: false
        });
    }

    useEffect(() => {
        setTheBoard()
    })

    const LargeSquareProps = {
        state: state,
        firestore: firestore,
        bigSquares: bigSquares
    }

    if (gameRoom !== false) {
        hostIcon = gameRoom.Host.token[0];
        guestIcon = gameRoom.Guest.token[0]
        playerToMove = gameRoom.PlayerToMove;

        return (
            <React.Fragment>
                <div className="fadeIn" id="boardModal">
                    <div id="playerBar">
                        <div className="simpleFlex col-3">{hostIcon}</div>
                        <div className="simpleFlex col-3">
                            <span></span>
                            <h3>Score</h3>
                            <span></span>
                        </div>
                        <div className="simpleFlex col-3">{guestIcon}</div>
                    </div>

                    <section className="grid board">
                        {bigSquares.map((val, i) =>
                            <LargeSquare key={i} id={val} props={LargeSquareProps} />)}
                    </section>
                    {`Next player: ${playerToMove}`}
                    <button type="button" className="btn btn-primary" onClick={leaveRoom}>Leave room</button>

                </div>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            Loading...
        </React.Fragment>
    );
}

export default Board;