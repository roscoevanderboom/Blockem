// Main imports
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import store from '../store';
import routes from '../routes';
import '../assets/css/App.css'

function App() {
    const { state, reducers, history } = React.useContext(store);

    React.useEffect(() => {
        reducers.handleUserAuth();
        reducers.getGameRoomsList();
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (!state.activeRoom) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [state.activeRoom])

    React.useEffect(() => {
        state.rooms.forEach(room => {
            if (room.Host.id === state.user.uid || room.Guest.id === state.user.uid) {
                reducers.watchActiveRoom(room.RoomID)
                return;
            }
        })
        // eslint-disable-next-line
    }, [state.rooms])
    return (
        <div className="App">
            <div className="container-fluid">
                <Switch>
                    {routes.map((route, i) =>
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            component={route.component} />
                    )}
                </Switch>
            </div>
        </div>
    );
}

export default App;
