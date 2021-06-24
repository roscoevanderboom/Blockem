import React from "react";
import { Provider } from "store/board";
// Components
import GameroomPage from "./GameroomPage";

export default function View() {
  return (
    <Provider>
      <GameroomPage />
    </Provider>
  );
}
