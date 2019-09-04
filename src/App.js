// Main imports
import React, { useState, useEffect } from 'react';
import firebase from './assets/firebase/Settings'

// Components
// import Navbar from "./assets/components/Navbar";
import AvatarSelect from "./assets/components/AvatarSelect";
import WaitingRoom from "./assets/components/WaitingRoom";
import Board from "./assets/components/Board";

// Styles
import './assets/components/styles/App.css';

// Firebase references
let auth = firebase.auth();


let db = firebase.firestore();
// Collections
let playerList = db.collection('WaitingList');
let gameRooms = db.collection('GameRooms');
// Documents
// let PlayersWaiting = playerList.doc('Players')
// let PulicRooms = gameRooms.doc('Public')
// let PrivateRooms = gameRooms.doc('Private')

const anonUser = () => {
    auth.signInAnonymously()
        .catch(function (error) {
            console.log(error.message)
        })
}

function App() {
    const [player, setPlayer] = useState(false);
    const [opponent, setOpponent] = useState(false);
    const [hostedRooms, setHostedRooms] = useState([]);
    const [gameRoom, setGameRoom] = useState(false);


    // Set current user/player
    const setUser = () => {
        auth.onAuthStateChanged(async (user) => {
            // If it's a first time user
            if (!(user)) {
                console.log('No user')
                anonUser()
                return;
            }
            getPlayers(user)
        });
    }
    const getPlayers = (user) => {
        playerList.get().then(function (querySnapshot) {
            // Create list of all player objects
            let players = [];
            querySnapshot.forEach(function (doc) {
                players.push(doc.data())
                // If user exists, set state and watch
                if (doc.data().id === user.uid) {
                    watchPlayer(user.uid);
                    setPlayer(doc.data());
                    return;
                }
            });

            // If user doesn't exist, create new document in collection
            // Prepare new player object
            const newPlayer = {
                id: user.uid,
                createDate: user.metadata.creationTime,
                ready: false,
                token: false,
                inRoom: false,
            }
            let ids = players.map(pl => pl.id)
            if (!(ids.includes(user.uid))) {
                playerList.doc(user.uid)
                    .set(newPlayer)
                    .then(() => {
                        setPlayer(newPlayer);
                        watchPlayer(user.uid);
                    });
            }
        });
    }
    const watchPlayer = (id) => {
        playerList.doc(id)
            .onSnapshot(function (doc) {
                setPlayer(doc.data());
            });
    }

    // Room functions
    const getRooms = () => {
        gameRooms.get().then(function (querySnapshot) {
            let rooms = [];
            querySnapshot.forEach(function (doc) {
                rooms.push(doc.data());
            });
            let available = rooms.filter(room => room.Available)
            setHostedRooms(available);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    const watchRoom = (id) => {
        gameRooms.doc(id)
            .onSnapshot(function (doc) {
                if (doc.data() && doc.data().Host !== undefined) {
                    if (doc.data().Host.id === player.id) {
                        setGameRoom(doc.data());
                        setOpponent(doc.data().Guest)
                    }
                    if (doc.data().Guest.id === player.id) {
                        setGameRoom(doc.data());
                        setOpponent(doc.data().Host)
                    }                    
                    return;
                }
                playerList.doc(player.id)
                    .update({
                        ready: false,
                        inRoom: false
                    })
                    .then(() => {
                        setGameRoom(false)
                        setOpponent(false)
                    })
            });
    }
    // const isPlayerReady = (id, ready, inRoom) => {
    //     playerList.doc(id).update({ ready: ready, inRoom: inRoom })
    // }


    // Render functions
    useEffect(() => {
        setUser();
        getRooms()
    }, [])


    const props = {
        AvatarSelect: {
            state: {
                player: player,
                hostedRooms: hostedRooms,
            },
            functions: {
                getRooms: getRooms,
                watchRoom: watchRoom,
                setOpponent: setOpponent,
            },
            firestore: {
                playerList: playerList,
                gameRooms: gameRooms
            }
        },
        WaitingRoom: {
            state: {
                player: player,
                opponent: opponent,
                gameRoom: gameRoom
            },
            functions: {
                watchRoom: watchRoom,
            },
            firestore: {
                gameRooms: gameRooms
            }
        },
        Board: {
            state: {
                gameRoom: gameRoom,
                player: player,
                opponent: opponent
            },
            firestore: {
                playerList: playerList,
                gameRooms: gameRooms
            },
            functions: {

            },

        }
    }

    const Route = () => {
        // Loading screen
        if (!(player)) {
            return (
                <React.Fragment>
                    Loading...
                </React.Fragment>
            );
        }
        // Player is not in a room. Go to Avartar Select Modal
        if (!(player.inRoom)) {
            return (
                <React.Fragment>
                    <AvatarSelect props={props.AvatarSelect} />
                </React.Fragment>
            );
        }
        // Player is ready and waiting
        if (player.inRoom && !(gameRoom.GameOn)) {
            return (
                <React.Fragment>
                    <WaitingRoom props={props.WaitingRoom} />
                </React.Fragment>
            );
        }
        // Player and opponent are ready. Game on!!
        if (player.inRoom && gameRoom.GameOn) {
            return (
                <React.Fragment>
                    <Board props={props.Board} />
                </React.Fragment>
            );
        }
    }

    return (
        <div className="App">
            {Route()}
        </div>
    );
}

export default App;
