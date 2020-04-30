import React, { useState, useEffect, useContext } from 'react';
import store from '../store';
import { three_small_squares } from '../constants/GameRoom';
import SquareSM from './SquareSM';
import squares from '../constants/Squares';
import "../assets/css/Board.css"


function Square(props) {
    const { state } = useContext(store);
    const { activeRoom, player, opponent } = state;
    const { id, sqIndex } = props;
    const [classes, setClasses] = useState('grid');
    const [restricted, setRestricted] = useState('');
    const [childNames, setChildNames] = useState([]);

    // const inspectChildren = (name) => {
    //     setChildNames(n => [...n, name])
    // }

    useEffect(() => {
       console.log(document.getElementById(id));
       three_small_squares(document.getElementById(id), id)
        // eslint-disable-next-line
    }, [activeRoom.NextSquare]);

    useEffect(() => {
        if (activeRoom.NextSquare === id || activeRoom.SquaresPlayed.length === 0) {
            setRestricted('');
            return;
        }
        setRestricted('restricted');
        // eslint-disable-next-line
    }, [activeRoom.NextSquare])

    return (
        <div id={id}
            className={`grid ${restricted}`}>
            {squares.map((sqval, i) =>
                <SquareSM key={sqval}
                    id={sqval + '-sm' + sqIndex} />
            )}
        </div>
    )
}

export default Square;