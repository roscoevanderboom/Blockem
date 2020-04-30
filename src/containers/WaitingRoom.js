import React, { useContext, useEffect } from 'react';
import store from '../store';

import '../assets/css/AvatarSelect.css';

function WaitingRoom() {
    const { state, history, reducers, fb } = useContext(store);
    const { player, activeRoom } = state;

    const handleReady = () => {
        if (activeRoom.Host.token.image === player.token.image) {
            fb.gameRooms.doc(activeRoom.RoomID).update({
                Host: {
                    ...activeRoom.Host,
                    ready: activeRoom.Host.ready ? false : true
                }
            })
            return;
        }
        fb.gameRooms.doc(activeRoom.RoomID).update({
            Guest: {
                ...activeRoom.Guest,
                ready: activeRoom.Guest.ready ? false : true
            }
        })
    }

    useEffect(() => {
        if (activeRoom && activeRoom.Host.ready && activeRoom.Guest.ready) {
            fb.gameRooms.doc(activeRoom.RoomID).update({
                Available: false
            }).then(() => { history.push('/gameRoom') })
        }
        // eslint-disable-next-line
    }, [activeRoom])

    return (
        <div className="card shadow-lg">
            {!activeRoom ? null :
                <React.Fragment>
                    <div className='card-header'>
                        <h3 className="card-title text-center pt-2">Waiting room</h3>
                    </div>
                    <div className="card-body d-flex justify-content-around align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <span className="avatarIcon-lg">{activeRoom.Host.token.image}</span>
                            <p className="m-0">
                                {activeRoom.Host.ready ? `Host ready!` : `Not ready`}
                            </p>
                        </div>
                        <h4 className="mt-3 ml-5 mr-5">VS</h4>
                        <div className="d-flex flex-column align-items-center">
                            <span className="avatarIcon-lg">{activeRoom.Guest.token.image}</span>
                            <p className="m-0">
                                {activeRoom.Guest.ready ? `Guest ready!` : `Not ready`}
                            </p>
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-around">
                        <button type="button"
                            onClick={handleReady}
                            className="btn btn-outline-primary shadow-lg">
                            {state.player.ready ? `Cancel ready` : `Set ready`}
                        </button>
                        <button type="button"
                            onClick={reducers.handleLeaveGame}
                            className="btn btn-outline-primary shadow-lg">Leave</button>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default WaitingRoom;