import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./store";
import { SnackbarProvider } from "notistack";

import "assets/scss/material-kit-react.scss?v=1.10.0";
import "assets/css/index.css";
import "assets/css/app.css";
import "assets/css/fonts.css";

// pages for this product
import App from "./App";

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    preventDuplicate
    hideIconVariant={false}
    autoHideDuration={5000}
    maxSnack={3}
  >
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </SnackbarProvider>,
  document.getElementById("root")
);
