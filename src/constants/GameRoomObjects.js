const noGuest = () => {
    return {
        token: '',
        id: false,
        ready: false
    }
}

export const newRoom = (host,newRoomID) => {
    return {
        Available: true,
        Host: host,
        Guest: noGuest(),
        RoomID: newRoomID,
        SquaresPlayed: [],
        NextPlayer: { token: { image: '' } },
        NextSquare: '',
        Winner: false
    }
}

export const newMove = (player, smSquare) => {
    return {
        image: player.token.image,
        square: smSquare.id,
        name: player.token.name
    }
}