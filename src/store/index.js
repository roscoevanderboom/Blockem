import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// Auth
import * as auth from '../constants/firebase/Auth';
// Pre-game methods
import * as pregame from '../constants/PreGame';
// Waitingroom mehods
import * as waitingroom from '../constants/WaitingRoom';
// In-Game methods
import * as inGame from '../constants/GameRoom';

// Store
const AppStore = createContext();

export const Provider = (props) => {
    const history = useHistory();
    // User state
    const [user, setUser] = useState(false);
    const [player, setPlayer] = useState(false);
    const [opponent, setOpponent] = useState(false);
    // Game State
    const [roomsList, setRoomsList] = useState([]);
    const [activeRoom, setActiveRoom] = useState(false);
    // Error
    // const [error, setError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // SignIn methods
    const signInAnonymously = () => {
        auth.signInAnonymously();
    }
    const handleUserAuth = () => {
        auth.handleUserAuth(setUser, setRoomsList, history);
    }
    // Pre-game methods
    const fetchGamerooms = () => {
        pregame.fetchGamerooms(setRoomsList);
    }
    const watchGameroom = (RoomID) => {
        pregame.watchGameroom(RoomID, user, setActiveRoom, history);
    }
    const handleCreateGameRoom = () => {
        pregame.handleCreateGameRoom(player, setRoomsList);
    }
    const handleJoinRoom = () => {
        pregame.handleJoinRoom(player, setRoomsList, history);
    }
    // Waitingroom mehods
    const handlePlayerReady = () => {
        waitingroom.handlePlayerReady(activeRoom, user);
    }
    const handleLeaveWaitingRoom = () => {
        waitingroom.handleLeaveWaitingRoom(user, activeRoom, setActiveRoom, history)
    }
    // Game methods
    const handlePlayerMove = (e) => {
        inGame.playerMove(e, activeRoom, user, player, opponent);
    }
    const handleLeaveGame = () => {
        inGame.handleLeaveGame(activeRoom, setActiveRoom, history);
    }

    // State objects for providers props
    const state = {
        user,
        player,
        opponent,
        roomsList,
        activeRoom
    };

    const setState = {
        setPlayer, setOpponent, setActiveRoom
    }
    const reducers = {
        //SignIn methods
        signInAnonymously,
        handleUserAuth,
        // Pre-game
        fetchGamerooms,
        watchGameroom,
        handleCreateGameRoom,
        handleJoinRoom,
        // Waiting room methods
        handlePlayerReady,
        handleLeaveWaitingRoom,
        // Game methods
        handlePlayerMove,
        handleLeaveGame
    };


    return (
        <AppStore.Provider
            value={{ state, setState, reducers, history }}>
            {props.children}
        </AppStore.Provider>
    )
};

export default AppStore;