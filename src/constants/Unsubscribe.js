// Unsuscribe from listener --- NOT WORKING!!!
// TODO -- fix this feature. Currently listener becomes inactive after
// a room is delete and new rooms are created with random ids    
export default (gameRooms, RoomID, setActiveRoom, history) => {
    gameRooms.doc(`${RoomID}`).onSnapshot(() => {
        console.log('Unsubscribe');
        setActiveRoom(false);
        history.push('/');
    })
}