import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CardsPage from "./cards/CardsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardDetailsPage from "./cards/CardDetailsPage";
import FiveTwentyFourPage from "./524/FiveTwentyFourPage";
import LoyaltyPage from "./loyalty/LoyaltyPage";
import ManageLoyaltyPage from "./loyalty/ManageLoyaltyPage";
import Test from "./testing/UseEffectTest";
import Checkbox from "./testing/Checkbox";
import Login from "./login/Login";
import { auth, login, logout, onAuthStateChanged } from "../tools/firebase";
import { Spinner } from "./common/Spinner";
import firebase from "firebase/compat/app";

export const WindowWidthContext = createContext();

function App() {
  const [userState, setUserState] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log({ user });
        setUserState({ user });
      } else {
        console.log("User is null");
      }
      // console.log({ auth });
    });

    return function () {
      unsubscribe();
    };
  }, [userState.user]);

  return (
    <div>
      <button onClick={login}>Google Login</button>
      <button onClick={logout}>Google Logout</button>
    </div>
  );

  // return (
  //   <>
  //     {userState.user === undefined ? (
  //       <Spinner />
  //     ) : userState.user ? (
  //       <WindowWidthContext.Provider value={windowWidth}>
  //         <Header user={userState.user} />
  //         <div className="container-fluid">
  //           <Switch>
  //             <Route exact path="/" component={HomePage} />
  //             <Route path="/about" component={AboutPage} />
  //             <Route path="/cards" component={CardsPage} />
  //             <Route path="/card/:id" component={CardDetailsPage} />
  //             <Route path="/524" component={FiveTwentyFourPage} />
  //             <Route path="/loyalty-accounts" component={LoyaltyPage} />
  //             <Route path="/loyalty/:id" component={ManageLoyaltyPage} />
  //             <Route path="/loyalty" component={ManageLoyaltyPage} />
  //             <Route path="/use-effect" component={Test} />
  //             <Route path="/test" component={Checkbox} />
  //             <Route component={PageNotFound} />
  //           </Switch>
  //           <ToastContainer autoClose={3000} hideProgressBar />
  //         </div>
  //       </WindowWidthContext.Provider>
  //     ) : (
  //       <Login windowWidth={windowWidth} />
  //     )}
  //   </>
  // );
}

export default App;
