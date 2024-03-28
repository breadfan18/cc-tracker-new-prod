import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import CardHoldersPage from "./cardholders/CardHoldersPage";
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
import TestPage from "./testing/TestPage";
import Login from "./login/Login";
import { Spinner } from "./common/Spinner";
import { useSigninCheck } from "reactfire";
import ReferralsPage from "./referrals/ReferralsPage";
export const WindowWidthContext = createContext();

function App() {
  const { status, data: signinResult } = useSigninCheck();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  const { signedIn, user } = signinResult;

  return signedIn === true ? (
    <>
      <WindowWidthContext.Provider value={windowWidth}>
        <Header user={user} />
        <main className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/card-holders" component={CardHoldersPage} />
            <Route path="/cards" component={CardsPage} />
            <Route path="/card/:id" component={CardDetailsPage} />
            <Route path="/524" component={FiveTwentyFourPage} />
            <Route path="/loyalty-accounts" component={LoyaltyPage} />
            <Route path="/loyalty/:id" component={ManageLoyaltyPage} />
            <Route path="/loyalty" component={ManageLoyaltyPage} />
            <Route path="/referrals" component={ReferralsPage} />
            <Route path="/use-effect" component={Test} />
            <Route path="/test" component={TestPage} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={3000} hideProgressBar />
        </main>
      </WindowWidthContext.Provider>
    </>
  ) : (
    <Login windowWidth={windowWidth} />
  );
}

export default App;
