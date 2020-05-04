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

// Initial state
import * as init from './initialState';

// Store
const AppStore = createContext();

export const Provider = (props) => {
    const history = useHistory();
    // User state
    const [user, setUser] = useState(false);
    const [accountAge, setAccountAge] = useState(0);
    const [player, setPlayer] = useState(init.player);
    const [opponent, setOpponent] = useState(false);
    // Game State
    const [roomsList, setRoomsList] = useState([]);
    const [activeRoom, setActiveRoom] = useState(false);
    // Error
    const [error, setError] = useState(false);
    // Loading
    const [loading, setLoading] = useState(true);

    // Error handling
    const handleErrors = (message) => {
        setError(error ? false : message);
    }
    // SignIn methods
    const signInAnonymously = () => {
        auth.signInAnonymously(setLoading);
    }
    const handleUserAuth = () => {
        auth.handleUserAuth(setUser, history, fetchGamerooms, setAccountAge);
    }
    // Pre-game methods
    const fetchGamerooms = () => {
        pregame.fetchGamerooms(setRoomsList);
    }
    const watchGameroom = (RoomID) => {
        pregame.watchGameroom(RoomID, user, setActiveRoom, setLoading);
    }
    const handleCreateGameRoom = () => {
        pregame.handleCreateGameRoom(player, fetchGamerooms, setLoading, handleErrors);
    }
    const handleJoinRoom = () => {
        pregame.handleJoinRoom(player, fetchGamerooms, setLoading, history, handleErrors);
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
        inGame.playerMove(e, activeRoom, user, player, opponent, handleErrors);
    }
    const handleLeaveGame = () => {
        inGame.handleLeaveGame(activeRoom, setActiveRoom, history);
    }

    // State objects for providers props
    const state = {
        accountAge,
        user,
        player,
        opponent,
        roomsList,
        activeRoom,
        loading,
        error
    };

    const setState = {
        setPlayer, setOpponent, setActiveRoom, setLoading
    }
    const reducers = {
        // Errors
        handleErrors,
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