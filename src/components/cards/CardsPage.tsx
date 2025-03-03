import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import CardTabs from "./CardTabs";
import { sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import CardAddEditModal from "./CardAddEditModal";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { useUser } from "reactfire";
import useWindhowWidth from "../../hooks/windowWidth";
import { MainReduxState } from "../../types/redux";

const CardsPage = () => {
  const { isDesktop, windowWidth } = useWindhowWidth();
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state: MainReduxState) => state.cardholders);
  const cards = useSelector((state: MainReduxState) =>
    sortCardsByDate(state.cards)
  );
  const loading = useSelector(
    (state: MainReduxState) => state.apiCallsInProgress > 0
  );
  const referrals = useSelector((state: MainReduxState) => state.referrals);

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadCardsFromFirebase(user.uid));
    }

    if (cardholders.length === 0 && user) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }

    if (referrals.length === 0 && user) {
      dispatch(loadReferralsFromFirebase(user.uid));
    }
  }, [status, user, cardholders]);

  return (
    <div className="cardsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Wallet</h2>
        <CardAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : windowWidth < 650 ? (
        <CardsByUserDropDown cards={cards} />
      ) : (
        <CardTabs
          cards={cards}
          windowWidth={windowWidth}
          isDesktop={isDesktop}
        />
      )}
    </div>
  );
};

export default CardsPage;
