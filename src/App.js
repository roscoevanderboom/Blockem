/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
// Routes
import routes from "./routes";
import store from "./store";
// Components
import Loader from "components/Loader";
import Menu from "components/Menu";

function App() {
  const { userData, loading } = useContext(store);
  const userNotNull = userData.user !== null;
  const userIsAnonymous = userData.user !== null && userData.user.isAnonymous;

  return (
    <div className="App">
      <div id="overlay">
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
        <Loader loading={loading} />
        {userNotNull && userData.uid !== "" && !userIsAnonymous && <Menu />}
      </div>
    </div>
  );
}

export default App;
