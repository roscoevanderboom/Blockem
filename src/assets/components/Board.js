import React, { useEffect, useState } from 'react';

// Constants
import Combos from '../constants/Combos'

// Components
import LargeSquare from './LargeSquare'
import WinnerModal from './WinnerModal'

// Styles
import './styles/Board.css';

function Board({ props }) {

    const [winner, setWinner] = useState(false);

    const { state, firestore } = props;
    const { gameRoom } = state;

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

    const threeInARow = (parent) => {
        let text = [];       

        document.getElementById(parent).childNodes.forEach(node => {
            text.push(node.textContent)
        });

        Combos.forEach(combo => {
            let values = []
            combo.forEach(val => {
                if (text[val] !== '') {
                    values.push(text[val])
                    return;
                }
            });

            if (values.length > 0 && values[0] === values[1] && values[1] === values[2]) {
                document.getElementById('winnerModal').classList.replace('fadeOut', 'fadeIn');
                document.getElementById('boardModal').classList.replace('fadeIn', 'fadeOut');
                setWinner(values[0])
            }
        })        
    }

    const setTheBoard = () => {
        if (gameRoom.NextSquare && !(winner)) {
            bigSquares.forEach((sq) => {
                threeInARow(sq)

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
    const WinnerModalProps = {
        winner: winner,       
        leaveRoom: leaveRoom,
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
                <WinnerModal props={WinnerModalProps} />
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