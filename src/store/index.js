import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../constants/firebase/Settings';
import { isMoveAllowed } from '../constants/GameRoom';

// Firebase references
let auth = firebase.auth();
let db = firebase.firestore();

// Collections
let playerList = db.collection('TestList');
let gameRooms = db.collection('TestRooms');

const AppStore = createContext();

export const Provider = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(false);
    const [player, setPlayer] = useState(false);
    const [opponent, setOpponent] = useState(false);
    const [winner, setWinner] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(false);

    const anonUser = () => {
        auth.signInAnonymously()
            .catch(function (error) {
                console.log(error.message)
            })
    }
    const handleUserAuth = () => {
        auth.onAuthStateChanged(async (user) => {
            // If it's a first time user
            if (!(user)) {
                anonUser()
                return;
            }
            setUser(user)
        });
    }
    const getGameRoomsList = () => {
        gameRooms.onSnapshot(function (querySnapshot) {
            let x = [];
            querySnapshot.forEach(function (doc) {
                if (doc.data()) {
                    x.push(doc.data());
                }
            });
            setRooms(x);
        }, function (error) {
            console.log(error.message);
        })
    }
    const watchActiveRoom = (RoomID) => {

        gameRooms.doc(RoomID).onSnapshot(function (doc) {
            if (doc.exists) {
                const players_not_ready = !doc.data().Host.ready || !doc.data().Guest.read;
                const players_ready = doc.data().Host.ready || doc.data().Guest.read;
                const game_in_session = doc.data().SquaresPlayed.length > 0;
                setActiveRoom(doc.data());
                if (doc.data().Host.id === user.uid) {
                    setPlayer(doc.data().Host);
                    setOpponent(doc.data().Guest)
                } else if (doc.data().Guest.id === user.uid) {
                    setPlayer(doc.data().Guest);
                    setOpponent(doc.data().Host)
                }
                if (players_not_ready) {
                    history.push('/waitingroom');
                }
                if (game_in_session || players_ready) {
                    history.push('/gameroom');
                }
            }
        }, function () {
            setActiveRoom(false);
            history.push('/');
        })
    }
    const handleLeaveGame = () => {
        setWinner(false);
        if (activeRoom.Host.id === user.uid) {
            gameRooms.doc(activeRoom.RoomID).delete()
                .then(() => { history.push('/') })
        } else if (activeRoom.Guest.id === user.uid) {
            gameRooms.doc(activeRoom.RoomID).update({
                Guest: {
                    token: false,
                    id: false,
                    ready: false
                }
            }).then(() => { history.push('/') })
                .catch(() => { history.push('/') })
        }
    }
    const handlePlayerMove = (e) => {
        if (activeRoom.NextPlayer.id === player.id) {
            let parent = e.target.parentElement;
            let smSquare = e.target;
            let nextSquareId = smSquare.id.slice(0, smSquare.id.indexOf('-'));

            if (!isMoveAllowed(parent, e.target, player, opponent)) {
                alert('That move is not allowed');
                return;
            }

            let currentMoves = activeRoom.SquaresPlayed;

            let newMove = {
                image: player.token.image,
                square: smSquare.id,
                name: player.token.name
            }
            currentMoves.push(newMove)

            gameRooms.doc(activeRoom.RoomID).update({
                NextPlayer: opponent,
                SquaresPlayed: currentMoves,
                NextSquare: nextSquareId + '-lg'
            })
            return;
        }
        alert('Sorry. Not your turn')
    }

    const state = {
        user, player, opponent, winner, rooms, activeRoom
    };

    const setState = {
        setPlayer, setOpponent, setWinner, setActiveRoom
    }
    const reducers = {
        handleUserAuth,
        handleLeaveGame,
        getGameRoomsList,
        watchActiveRoom,
        handlePlayerMove
    };

    const fb = {
        auth, playerList, gameRooms
    }
    return (
        <AppStore.Provider
            value={{ state, setState, reducers, history, fb }}>
            {props.children}
        </AppStore.Provider>
    )
};

export default AppStore;