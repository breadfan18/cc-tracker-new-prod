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

export const WindowWidthContext = createContext();

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  return (
    <>
      <WindowWidthContext.Provider value={windowWidth}>
        <div className="navContainer">
          <Header />
        </div>
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/cards" component={CardsPage} />
            <Route path="/card/:id" component={CardDetailsPage} />
            <Route path="/524" component={FiveTwentyFourPage} />
            <Route path="/loyalty-accounts" component={LoyaltyPage} />
            <Route path="/loyalty/:id" component={ManageLoyaltyPage} />
            <Route path="/loyalty" component={ManageLoyaltyPage} />
            <Route path="/use-effect" component={Test} />
            <Route path="/test" component={Checkbox} />
            <Route component={PageNotFound} />
          </Switch>
          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </WindowWidthContext.Provider>
    </>
  );
}

export default App;
