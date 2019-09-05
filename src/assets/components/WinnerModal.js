import React from 'react';

// Styles
import './styles/WinnerModal.css';

const WinnerModal = ({ props }) => {

    const { leaveRoom, winner } = props;
    
    return (
        <React.Fragment>
            <div id="winnerModal" className="fadeOut">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-around align-items-center flex-wrap">
                            <h1 className="modal-title text-center">
                                {winner ? `${winner} is the winner!!`: ''}
                            </h1>
                        </div>                      
                        <div className="modal-footer row justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={leaveRoom}>Leave room</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default WinnerModal;