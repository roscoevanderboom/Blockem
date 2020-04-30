import React, { useState, useEffect, useContext } from 'react';
import store from '../store';
import "../assets/css/Board.css"


function Square(props) {
    const { state, reducers } = useContext(store);
    const { activeRoom } = state;
    const { handlePlayerMove } = reducers;
    const { id, inspectChildren } = props;
    const [textContent, setTextContent] = useState('');
    const [owner, setOwner] = useState('')

    useEffect(() => {
        if (activeRoom) {
            activeRoom.SquaresPlayed.forEach(sq => {
                if (sq.square === id) {
                    setTextContent(sq.image);
                    // inspectChildren(sq.name);
                }
            })
        }
        // eslint-disable-next-line
    }, [activeRoom.SquaresPlayed])

    return (
        <div id={id}
            className={"smallSquare " + owner}
            onClick={(e) => handlePlayerMove(e)} >
            {textContent}
        </div>
    )
}

export default Square;