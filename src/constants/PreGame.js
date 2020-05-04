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

export const handleCreateGameRoom = (player, fetchGamerooms, setLoading, handleErrors) => {
    if (!isPlayerReady(player, handleErrors)) {
        return;
    }
    setLoading(true);
    let newRoomID = random();
    let data = newRoom(player, newRoomID);
    gameRooms.doc(newRoomID).set(data)
        .then(() => fetchGamerooms())
        .catch((err) => {
            setLoading(false);
            console.log(err.message)
        })
}

export const handleJoinRoom = (player, fetchGamerooms, setLoading, history, handleErrors) => {
    if (!isPlayerReady(player, handleErrors)) {
        return;
    }
    let rooms = [];
    setLoading(true);
    gameRooms.where('Available', '==', true).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().Guest.id || !isAvatarAvailable(player, doc.data())) {
                    return;
                }
                rooms.push(doc.data().RoomID)
            })
        })
        .then(() => {
            if (rooms.length === 0) {
                setLoading(false);
                handleErrors('No rooms available. Try a different animal or create a new room.');
                return;
            }
            gameRooms.doc(rooms[0]).update({
                Available: false,
                Guest: player
            })
                .then(() => fetchGamerooms())
                .catch(() => {
                    setLoading(false);
                    history.push('/')
                })
        })
        .catch((err) => console.log(err.message))
}