import React, { useEffect, useState } from 'react';

// Styles
import '../assets/css/WinnerModal.css';

const WinnerModal = (props) => {
    const { winner, reducers } = props;
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (winner === 'tie') {
            setMessage(`It's a tie! Better luck next time.`);
            return;
        }
        setMessage(`${winner} is the winner!!`);
    }, [winner])

    return (
        <React.Fragment>
            <div id="winnerModal" className={winner ? "fadeIn" : "fadeOut"}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-around align-items-center flex-wrap">
                            <h1 className="modal-title text-center">
                                {message}
                            </h1>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-outline-primary" onClick={reducers.handleLeaveGame}>Leave room</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default WinnerModal;