import LandingPage from "../views/LandingPage";
import LoginPage from "../views/LoginPage";
import CreateProfilePage from "../views/CreateProfilePage";
import ProfilePage from "../views/ProfilePage";
import FriendsList from "../views/FriendsList";
import Gameroom from "../views/Gameroom";
import GamesListPage from "../views/GamesListPage";
import SelectAvatarPage from "../views/SelectAvatarPage";
import SettingPage from "../views/SettingPage";
import DeleteResetPage from "../views/DeleteResetPage";
// import WaitingRoomPage from "../views/WaitingRoomPage";

const routes = [
  { path: "/", component: LandingPage, exact: true },
  { path: "/login", component: LoginPage },
  { path: "/create-profile", component: CreateProfilePage },
  { path: "/profile", component: ProfilePage },
  { path: "/friends-list", component: FriendsList },
  { path: "/avatar-select", component: SelectAvatarPage },
  { path: "/games-list", component: GamesListPage },
  { path: "/gameroom", component: Gameroom },
  { path: "/settings", component: SettingPage },
  { path: "/delete-reset", component: DeleteResetPage },
];

export default routes;
