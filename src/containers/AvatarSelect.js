import React, { useState, useContext, useEffect } from 'react';
import store from '../store';

import tokens from '../constants/Tokens';
import { newRoom } from '../constants/GameRoomObjects';

import '../assets/css/AvatarSelect.css';


function AvatarSelect() {
    const { state, history, setState, fb } = useContext(store);
    const { gameRooms } = fb;
    const [header, setHeader] = useState('Select Your Avatar');
    const [availableRooms, setAvailableRoom] = useState([]);

    const handleAvatarSelect = (token) => () => {
        setHeader(`Good luck ${token.adj} ${token.image}`);
        setState.setPlayer({
            token: token,
            id: state.user.uid,
            ready: false
        });
    }

    const isPlayerReady = () => {
        if (!state.player) {
            alert('Please select an avatar');
            return false
        }
        return true;
    }

    const joinRoom = () => {
        if (!isPlayerReady()) {
            return;
        }

        if (state.rooms.length === 0) {
            alert("No rooms, create a room");
            return;
        }
        if (state.player.image === state.rooms[0].Host.token.image) {
            alert("Host already selected that animal");
            return;
        }

        gameRooms.doc(state.rooms[0].RoomID).update({
            Guest: state.player,
            NextPlayer: state.player,
        })
            .then(function () {
                history.push('/waitingRoom');
            })
    }

    const createRoom = () => {
        if (!isPlayerReady()) {
            return;
        }
        let room = newRoom(state);

        gameRooms.doc(state.user.uid).set(room)
            .then(function () {
                history.push('/waitingRoom');
            })
    }

    useEffect(() => {
       setAvailableRoom(state.rooms.filter(room => room.Available === true))
    },[state.rooms])

    return (
        <div className="card shadow-lg">
            <div className='card-header'>
                <h3 className="card-title text-center pt-2">{header}</h3>
                <p className="text-center m-0">{availableRooms.length} Rooms available</p>
            </div>
            <div className="card-body">
                <div className="container">
                    {tokens.map((token, i) =>
                        <button key={i}
                            className="avatarIcon"
                            onClick={handleAvatarSelect(token)}>{token.image}</button>
                    )}
                </div>
            </div>
            <div className="card-footer d-flex justify-content-around">
                <button type="button" className="btn btn-outline-primary shadow-lg" onClick={joinRoom}>Join room</button>
                <button type="button" className="btn btn-outline-primary shadow-lg" onClick={createRoom}>Create room</button>
            </div>
        </div>
    )
}

export default AvatarSelect;