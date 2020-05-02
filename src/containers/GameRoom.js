import React, { useContext, useEffect } from 'react';
import store from '../store';

import {
    setPlayers,
    setSmallSquares,
    setRestrictions,
    check_big_squares,
    check_small_squares
} from '../constants/GameRoom';
import squares from '../constants/Squares';

import WinnerModal from '../components/WinnerModal';
import '../assets/css/Board.css'

function GameRoom() {
    const { state, reducers, setState, history } = useContext(store);
    const { handlePlayerMove, handleLeaveGame } = reducers;
    const { setPlayer, setOpponent, setActiveRoom } = setState;
    const { winner, activeRoom, user } = state;

    useEffect(() => {
        if (activeRoom) {
            setPlayers(activeRoom, user, setPlayer, setOpponent)
        }
        if (activeRoom && !activeRoom.Guest.id) {
            alert('Guest has left the room.');
        }
        if (!activeRoom) {
            history.push('/');
        }
        //eslint-disable-next-line
    }, [activeRoom])

    useEffect(() => {
        let board = document.getElementById('gameboard');
        if (board !== null) {
            let bigSquares = board.childNodes;
            setSmallSquares(activeRoom);

            check_big_squares(bigSquares, activeRoom);
            bigSquares.forEach(sq => {
                check_small_squares(sq)
            });
            setRestrictions(bigSquares, winner, activeRoom);
        }
        //eslint-disable-next-line
    })

    useEffect(() => {
        return () => {
            setActiveRoom(false);
            setPlayer(false);
            setOpponent(false);
        }
        //eslint-disable-next-line
    }, [])

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
                                    onClick={(e) => handlePlayerMove(e)} >
                                </div>
                            )}
                        </div>
                    )}
                </section>

                <div className="d-flex justify-content-around mt-2 w-50">
                    <button type="button"
                        onClick={handleLeaveGame}
                        className="btn-lg btn-dark shadow-lg">Leave</button>
                </div>
            </div>
            <WinnerModal activeRoom={activeRoom} reducers={reducers} />
        </React.Fragment>
    )
}

export default GameRoom;