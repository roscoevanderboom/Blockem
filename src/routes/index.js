import AvatarSelect from '../containers/AvatarSelect';
import GameRoom from '../containers/GameRoom';
import WaitingRoom from '../containers/WaitingRoom';

const routes = [
    { path: '/', component: AvatarSelect, exact: true },
    { path: '/gameroom', component: GameRoom },
    { path: '/waitingroom', component: WaitingRoom },
];

export default routes;