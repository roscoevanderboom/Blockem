import React, { useState, useContext, useEffect } from 'react';
import store from '../store';

import tokens from '../constants/Tokens';

import '../assets/css/AvatarSelect.css';
import styles from '../assets/js-css/main';

function AvatarSelect() {
    const { state, setState, reducers } = useContext(store);
    const [header, setHeader] = useState('Select Your Avatar');

    const handleAvatarSelect = (token) => () => {
        setHeader(`Good luck ${token.adj} ${token.image}`);
        setState.setPlayer({
            ...state.player,
            token: token,
            id: state.user.uid
        });
    }

    const handleName = (e) => {
        if (e.target.value.length > 11) {
        reducers.handleErrors('Only 10 letters allowed');
        return;
        }
        setState.setPlayer({
            ...state.player,
            displayname: e.target.value
        })
    }

    useEffect(() => {
        setState.setActiveRoom(false);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="card shadow-lg">
            <div className='card-header'>
                <h3 style={styles.header} className="card-title text-center pt-2">{header}</h3>
                <input value={state.player ? state.player.displayname : ''} className="form-control" placeholder="Enter a short displayname" onChange={handleName} />
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
                <button type="button" className="btn joinBtn shadow" onClick={reducers.handleJoinRoom}>Join room</button>
                <button type="button" className="btn createRoomBtn shadow" onClick={reducers.handleCreateGameRoom}>Create room</button>
            </div>
            <p style={styles.par} className="text-center">{5 - state.accountAge + ' days left before account restart'}</p>
        </div>
    )
}

export default AvatarSelect;