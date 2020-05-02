import AvatarSelect from '../containers/AvatarSelect';
import GameRoom from '../containers/GameRoom';
import WaitingRoom from '../containers/WaitingRoom';
import UnderConstruction from '../containers/UnderConstruction';
import LandingPage from '../containers/LandingPage';

const routes = [
    { path: '/', component: AvatarSelect, exact: true },
    { path: '/landingPage', component: LandingPage },    
    { path: '/gameroom', component: GameRoom },
    { path: '/waitingroom', component: WaitingRoom },
    { path: '/underConstruction', component: UnderConstruction },
];

export default routes;