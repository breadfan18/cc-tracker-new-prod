import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { FirebaseAppProvider, AuthProvider } from "reactfire";
import { auth, firebaseConfig } from "./tools/firebase";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <AuthProvider sdk={auth}>
          <App />
        </AuthProvider>
      </FirebaseAppProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
