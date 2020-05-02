import { newRoom } from './GameRoomObjects';
import { isPlayerReady, isAvatarAvailable } from './Verification';
import { gameRooms } from './firebase/Collections';

const random = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const fetchGamerooms = (setRoomsList) => {
    gameRooms.get()
        .then(function (querySnapshot) {
            let rooms = [];
            querySnapshot.forEach(function (doc) {
                rooms.push(doc.data());
            });
            setRoomsList(rooms);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

export const watchGameroom = (RoomID, user, setActiveRoom, setLoading) => {
    gameRooms.doc(RoomID).onSnapshot(function (doc) {
        // Game is in session
        if (doc.exists) {
            let userIsInRoom = doc.data().Host.id === user.uid || doc.data().Guest.id === user.uid
            if (userIsInRoom) {
                setActiveRoom(doc.data());
                setLoading(false);
                return;
            }
        }
        if (doc.exists) {
            let userIsInRoom = doc.data().Host.id === user.uid || doc.data().Guest.id === user.uid
            if (!userIsInRoom) {
                setLoading(false);
                return;
            }
        }
        // If room has been deleted by host
        setLoading(false);
        setActiveRoom(false);
    }, function (err) {
        console.log(err)
        setActiveRoom(false);
        setLoading(false);
    })
}

export const handleCreateGameRoom = (player, fetchGamerooms) => {
    let newRoomID = random();
    let data = newRoom(player, newRoomID);
    gameRooms.doc(newRoomID).set(data)
        .then(() => fetchGamerooms())
        .catch((err) => console.log(err.message))
}

export const handleJoinRoom = (player, fetchGamerooms, history) => {
    if (!isPlayerReady(player)) {
        return;
    }
    gameRooms.where('Available', '==', true).get()
        .then((querySnapshot) => {
            let rooms = [];
            querySnapshot.forEach((doc) => {
                if (!doc.data().Guest.id
                    && isAvatarAvailable(player, doc.data())) {
                    rooms.push(doc.data().RoomID)
                }
            })
            if (rooms.length > 0) {
                gameRooms.doc(rooms[0]).update({
                    Available: false,
                    Guest: player
                })
                    .then(() => fetchGamerooms())
                    .catch(() => history.push('/'))
            }
            if (rooms.length === 0) {
                alert('No rooms available. Create a new room.')
            }

        })
}