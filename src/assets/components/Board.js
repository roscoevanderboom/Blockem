import React, { useState, useEffect } from 'react';

// Components
import LargeSquare from "./LargeSquare";

// Styles

function Board({ props }) {

    const { functions, state } = props;

    useEffect(() => {
          
    })

    return (
        <React.Fragment>
            <div className="fadeOut" id="boardModal">
                <div id="playArea">
                    <select id="counter" className="browser-default custom-select custom-select-lg mb-3">
                        <option value="5">5 sec</option>
                        <option value="10">10 sec</option>
                        <option value="15">15 sec</option>
                        <option value="20">20 sec</option>
                        <option value="25">25 sec</option>
                        <option value="30">30 sec</option>
                    </select>
                </div>

                <section className="animated board grid">
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                    <LargeSquare />
                </section>
            </div>
        </React.Fragment>
    )
}

export default Board;