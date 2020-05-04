import React, { useContext, useEffect, useState } from 'react';
import store from '../store';

import '../assets/css/AvatarSelect.css';
import styles from '../assets/js-css/main';

function WaitingRoom() {
    const { state, reducers, history } = useContext(store);
    const { activeRoom } = state;
    const [helperMessage, setHelperMessage] = useState(false);
    const [roomData, setRoomData] = useState({
        Host: {
            ready: false,
            name: '',
            token: { image: '', name: '' }
        },
        Guest: {
            ready: false,
            name: '',
            token: { image: '', name: '' }
        }
    })

    useEffect(() => {
        if (activeRoom) {
            setRoomData(activeRoom);
        }
        if (!activeRoom) {
            history.push('/');
        }
        // eslint-disable-next-line
    }, [activeRoom])

    useEffect(() => {
        let help = setTimeout(() => {
            if (activeRoom && !activeRoom.Guest.id) {
                setHelperMessage(true);
            }
        }, 10000);

        if (activeRoom && activeRoom.Guest.id) {
            setHelperMessage(false);
        }

        return () => {
            clearTimeout(help);
        }
        // eslint-disable-next-line
    }, [activeRoom.Guest])

    return (
        <div className="card shadow-lg">
            <div className='card-header'>
                <h3 style={styles.header} className="card-title text-center pt-2">Waiting room</h3>
                {!helperMessage ? null :
                    <p>Been waiting long? Share the website address with a friend!</p>
                }
            </div>
            <div className="card-body d-flex justify-content-around align-items-center">
                <div className="d-flex flex-column align-items-center">
                    <p style={styles.par} className="m-0">
                        {roomData.Host.displayname}
                    </p>
                    <span className="avatarIcon-lg">{roomData.Host.token.image}</span>
                    <p style={styles.par} className="m-0">
                        {roomData.Host.ready ? `Host ready!` : `Not ready`}
                    </p>
                </div>
                <h4 className="mt-3 ml-5 mr-5">VS</h4>
                <div className="d-flex flex-column align-items-center">
                    <p style={styles.par} className="m-0">
                        {roomData.Guest.displayname}
                    </p>
                    <span className="avatarIcon-lg">{roomData.Guest.token.image}</span>
                    <p style={styles.par} className="m-0">
                        {roomData.Guest.ready ? `Guest ready!` : `Not ready`}
                    </p>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-around">
                <button type="button"
                    onClick={reducers.handlePlayerReady}
                    className="btn createRoomBtn shadow-lg">
                    {state.player.ready ? `Cancel ready` : `Set ready`}
                </button>
                <button type="button"
                    onClick={reducers.handleLeaveWaitingRoom}
                    className="btn joinBtn shadow-lg">Leave</button>
            </div>
        </div>
    )
}

export default WaitingRoom;