import React, { useEffect } from 'react';


// Styles
import './styles/WaitingRoom.css';

function WaitingRoom({ props }) {

    const { functions, state, firestore } = props;
    const { player, opponent, gameRoom } = state;

    const startGame = () => {
        if (opponent) {
            firestore.gameRooms.doc(gameRoom.ID).update({
                Host: {
                    token: player.token,
                    id: player.id,
                    ready: true
                },
                GameOn: true
            })                      
            return;
        }
        alert('No guest. Please wait')
    }

    useEffect(() => {       
        functions.watchRoom(player.inRoom);
    }, [])


    if (gameRoom) {       
        return (
            <React.Fragment>
                <div className="fadeIn" id="waitingRoomModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header row justify-content-around">
                                <h5 className="modal-title text-center" id="AvatarIcon">
                                    Waiting Room
                                </h5>
                            </div>
                            <div className="modal-body waitingRoomBody">
                                <div className="d-flex flex-column align-items-center">
                                    {player ? player.token[0] : 'Waiting'}
                                    {player.id === gameRoom.Host.id && !(gameRoom.Host.ready) ?
                                        <button className="btn" onClick={startGame}>Start!</button> :
                                        <span>Ready</span>}
                                </div>
                                <div>vs</div>
                                <div className="d-flex flex-column align-items-center">
                                    <span>{opponent ? opponent.token[0] : 'Waiting'}</span>
                                    <span> {opponent.ready ? 'Ready' : 'Not ready'}</span>
                                </div>
                            </div>
    
                            <div className="modal-footer row justify-content-center">
    
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    };
  
    
    return (          
        <React.Fragment>
            Loading...
        </React.Fragment>
    );
    
}

export default WaitingRoom;