import React, { useState, useContext, useEffect } from 'react';
import store from '../store';

import tokens from '../constants/Tokens';

import '../assets/css/AvatarSelect.css';


function AvatarSelect() {
    const { state, setState, reducers } = useContext(store);
    const [header, setHeader] = useState('Select Your Avatar');

    const handleAvatarSelect = (token) => () => {
        setHeader(`Good luck ${token.adj} ${token.image}`);
        setState.setPlayer({
            token: token,
            id: state.user.uid,
            ready: false
        });
    }

    useEffect(() =>{
        setState.setActiveRoom(false);
        // eslint-disable-next-line
    },[])

    return (
        <div className="card shadow-lg">
            <div className='card-header'>
                <h3 className="card-title text-center pt-2">{header}</h3>
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
                <button type="button" className="btn btn-outline-primary shadow-lg" onClick={reducers.handleJoinRoom}>Join room</button>
                <button type="button" className="btn btn-outline-primary shadow-lg" onClick={reducers.handleCreateGameRoom}>Create room</button>
            </div>
        </div>
    )
}

export default AvatarSelect;