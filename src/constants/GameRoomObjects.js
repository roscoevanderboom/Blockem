export const newRoom = (state) => {
    return {
        Available: true,
        Host: state.player,
        Guest: {
            token: false,
            id: false,
            ready: false
        },
        RoomID: state.user.uid,
        SquaresPlayed: []
    }
}