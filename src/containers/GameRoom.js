import React, { useContext, useEffect } from 'react';
import store from '../store';

import { setBoard, check_big_squares, check_small_squares } from '../constants/GameRoom';
import squares from '../constants/Squares';

import WinnerModal from '../components/WinnerModal';
import '../assets/css/Board.css'


function GameRoom() {
    const { state, reducers, setState } = useContext(store);
    const { setWinner } = setState;
    const { winner, activeRoom } = state;

    useEffect(() => {
        let board = document.getElementById('gameboard');
        if (board !== null) {
            let bigSquares = board.childNodes;
            setBoard(bigSquares, winner, activeRoom, setWinner);
            check_big_squares(bigSquares, setWinner);
            bigSquares.forEach(sq => {
                check_small_squares(sq)
            });
            setBoard(bigSquares, winner, activeRoom, setWinner);
        }
        //eslint-disable-next-line
    }, [state.activeRoom.NextPlayer])

    return (activeRoom &&
        <React.Fragment>
            <div id="boardModal">
                <div className="mb-2" id="playerBar">
                    <div className="bg-dark p-3 text-light rounded">
                        <h3 className="m-0"> {`Next player: ${activeRoom.NextPlayer.token.image}`}</h3>
                    </div>
                </div>

                <section id="gameboard" className="grid board">
                    {squares.map((val, i) =>
                        <div key={i}
                            id={val + '-lg'}
                            className="grid">
                            {squares.map((sqval) =>
                                <div key={sqval}
                                    id={sqval + '-sm' + i}
                                    className="smallSquare "
                                    onClick={(e) => reducers.handlePlayerMove(e)} >
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <div className="d-flex justify-content-around mt-2 w-50">
                    <button type="button"
                        onClick={reducers.handleLeaveGame}
                        className="btn-lg btn-dark shadow-lg">Leave</button>
                </div>
            </div>
            <WinnerModal winner={winner} reducers={reducers} />
        </React.Fragment>
    )
}

export default GameRoom;