import React, { useState, useEffect } from 'react';

function LargeSquare() {

    // const { functions, state } = props;

    useEffect(() => {
        console.log('large square')
    })

    const squares = [1,2,3,4,5,6,7,8,9]

    return (
        <React.Fragment>
            <section className="grid largeSquare">
                {squares.map(val => 
                    <div key={val} className="smallSquare"></div>) }                    
            </section>
        </React.Fragment>
    )
}

export default LargeSquare;