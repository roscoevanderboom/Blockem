
export const isPlayerReady = (player, handleErrors) => {
    if (!player.id) {
        handleErrors('Please select an avatar');
        return false
    }
    return true;
}
export const areRoomsAvailable = (rooms) => {
    if (rooms.length === 0) {
        alert("No rooms available. Create a new room.");
        return false
    }
    return true;
}
export const isAvatarAvailable = (player, room) => {
    if (player.token.image === room.Host.token.image) {
        return false
    }
    return true;
}
export const isUserInRoom = (rooms, user) => {    
    return new Promise((resolve, reject) => {
        let list = rooms.filter(room =>
            room.Host.id === user.uid || room.Guest.id === user.uid);            
        if (list.length > 0) {          
            resolve(list[0]);
        } else {
            reject(false)
        }
    })
}
export const arePlayerReady = (room) => {
    const players_not_ready = !room.Host.ready || !room.Guest.ready;
    const players_ready = room.Host.ready && room.Guest.ready;

    if (players_not_ready) {
        return false;
    } else if (players_ready) {
        return true;
    }
}