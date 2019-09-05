import React from 'react';

// Components
import tokens from './tokens/Tokens'

// Styles
import './styles/AvatarSelectModal.css';

function AvatarSelect({ props }) {

    const { state, firestore, functions } = props;
    const { player, hostedRooms } = state;

    const getToken = (token) => {
        functions.getRooms();
        firestore.playerList.doc(player.id)
            .update({
                token: token,
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
    }

    const joinRoom = () => {
        functions.getRooms()
        if (!(player.token)) {
            alert('Please select an avatar');
            return
        }
        if (hostedRooms.length === 0) {
            alert("No rooms, create a room");
            return;
        }
        if (player.token[0] === hostedRooms[0].Host.token[0]) {
            alert("Host already selected that animal");
            return;
        }       

        firestore.playerList.doc(player.id)
            .update({
                ready: true,
                inRoom: hostedRooms[0].ID
            })
            .then(function () {
                firestore.gameRooms.doc(hostedRooms[0].ID)
                    .update({
                        Available: false,
                        Guest: {
                            token: player.token,
                            id: player.id,
                            ready: true,
                        },
                        PlayerToMove: player.token[0]
                    })
                    .catch(() => {
                        firestore.playerList.doc(player.id)
                            .update({
                                ready: false,
                                inRoom: false
                            })
                    })
            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });

        return true;
    }

    const createRoom = () => {
        if (!(player.token)) {
            alert('Please select an avatar');
            return
        }
        let newRoom = {
            Available: true,
            Host: {
                token: player.token,
                id: player.id,
                ready: false
            },
            GameOn: false,
            Guest: false,
            ID: player.id,
            PlayerToMove: null,
            NextSquare: false,
            SquaresPlayed: []
        }

        firestore.gameRooms.doc(player.id).set(newRoom)
            .then(function () {
                firestore.playerList.doc(player.id)
                    .update({
                        ready: true,
                        inRoom: player.id
                    })
            })
    }


    return (
        <React.Fragment>
            <div className="fadeIn" id="AvatarSelectModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <h5 className="modal-title text-center pt-2" id="AvatarIcon">
                            {!(player.token) ? `Select your avatar` :
                                `Good luck ${player.token[2]} ${player.token[0]}`}
                        </h5>
                        <p className="text-center">{hostedRooms.length} Rooms available</p>
                        <div className="modal-body">
                            {tokens.map((token, key) =>
                                <div key={key} className="token" id={token[1]}>
                                    <span role='img' aria-label={token[1]} onClick={() => { getToken(token) }}>{token[0]}</span>
                                </div>)}
                        </div>

                        <div className="modal-footer row justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={joinRoom}>Join room</button>
                            <button type="button" className="btn btn-primary" onClick={createRoom}>Create room</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AvatarSelect;