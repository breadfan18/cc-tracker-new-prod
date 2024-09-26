import React, { createContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import CardHoldersPage from "./cardholders/CardHoldersPage";
import Header from "./header/Header";
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
import useWindhowWidth from "../hooks/windowWidth";
import ThemeToggle from "./header/ThemeToggle";
export const WindowWidthContext = createContext();

function App() {
  const { status, data: signinResult } = useSigninCheck();
  const { windowWidth, isMobile } = useWindhowWidth();

  if (status === "loading") {
    return <Spinner />;
  }

  const { signedIn, user } = signinResult;

  return signedIn === true ? (
    <>
      <WindowWidthContext.Provider value={windowWidth}>
        {/* Rendering ThemeToggle with display set to false here so that 
        it is available in the context for the App component.. otherwise, 
        dark mode would reset to light on refresh
        */}
        <ThemeToggle displayToggle={false} />
        <Header user={user} isMobile={isMobile} />
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
