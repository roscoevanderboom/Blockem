import React, { useEffect, useState } from 'react';
import "../assets/css/WinnerModal.css"

const WinnerModal = (props) => {
    const { reducers, activeRoom } = props;
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (activeRoom.Winner === 'tie') {
            setMessage(`It's a tie! Better luck next time.`);
            return;
        }
        setMessage(`${activeRoom.Winner} is the winner!!`);
    }, [activeRoom.Winner])

    return (
        <React.Fragment>
            <div id="winnerModal" className={activeRoom.Winner ? "fadeIn" : "fadeOut"}>
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