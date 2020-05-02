import { newRoom } from './GameRoomObjects';
import { gameRooms } from './firebase/Collections';
import { isHost } from './GameRoom';
import unsubscribeFromActiveRoom from './Unsubscribe';

export const handlePlayerReady = (activeRoom, user) => {
    switch (isHost(activeRoom, user)) {
        case true:
            gameRooms.doc(activeRoom.RoomID).update({
                Host: {
                    ...activeRoom.Host,
                    ready: activeRoom.Host.ready ? false : true
                }
            })
            break;
        default:
            gameRooms.doc(activeRoom.RoomID).update({
                Guest: {
                    ...activeRoom.Guest,
                    ready: activeRoom.Guest.ready ? false : true
                },
                NextPlayer: activeRoom.Guest
            })
            break;
    }
}

export const handleLeaveWaitingRoom = (user, activeRoom, setActiveRoom, history) => {
    if (user.uid === activeRoom.Host.id) {
        gameRooms.doc(activeRoom.RoomID).delete()
            .then(() => unsubscribeFromActiveRoom(gameRooms, activeRoom.RoomID, setActiveRoom, history))
        return;
    }
    let data = newRoom(activeRoom.Host, activeRoom.RoomID);
    gameRooms.doc(activeRoom.RoomID).update(data)
        .then(() => unsubscribeFromActiveRoom(gameRooms, activeRoom.RoomID, setActiveRoom, history))
}