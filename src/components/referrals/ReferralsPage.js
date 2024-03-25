import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { useUser } from "reactfire";
import ReferralsList from "./ReferralsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { WindowWidthContext } from "../App";
import { sortReferralsByDate } from "../../helpers";
import ReferralAddEditModal from "./ReferralAddEditModal";

const ReferralsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );

  const cards = useSelector((state) => state.cards);
  const referrals = useSelector((state) =>
    sortReferralsByDate(state.referrals)
  );

  const loading = useSelector(
    (state) =>
      state.apiCallsInProgress > 0 ||
      cardholders.length === 0 ||
      referrals.length === 0 ||
      cards.length === 0
  );

  useEffect(() => {
    if (referrals.length === 0 && status !== "loading") {
      dispatch(loadReferralsFromFirebase(user.uid));
    }
    if (cardholders.length === 0 && status !== "loading") {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadCardsFromFirebase(user.uid));
    }
  }, [user]);

  const cardsByHolder = _.groupBy(cards, (o) => o.userId);

  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Referrals</h2>
        <ReferralAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <ReferralsList
          referrals={referrals}
          cardholders={cardholders}
          cardsByHolder={cardsByHolder}
        />
      )}
    </div>
  );
};

export default ReferralsPage;
