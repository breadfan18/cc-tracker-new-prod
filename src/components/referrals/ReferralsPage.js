import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { useUser } from "reactfire";
import ReferralsList from "./ReferralsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { WindowWidthContext } from "../App";
import { sortReferralsByDate } from "../../helpers";
import ReferralAddEditModal from "./ReferralAddEditModal";
import ReferralCards from "./ReferralCards";

const ReferralsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cards = useSelector((state) => state.cards);
  const referrals = useSelector((state) =>
    sortReferralsByDate(state.referrals)
  );

  const loading = useSelector(
    (state) =>
      state.apiCallsInProgress > 0 ||
      referrals.length === 0 ||
      cards.length === 0
  );

  useEffect(() => {
    if (referrals.length === 0 && status !== "loading") {
      dispatch(loadReferralsFromFirebase(user.uid));
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
      ) : windowWidth > 1000 ? (
        <ReferralsList referrals={referrals} cardsByHolder={cardsByHolder} />
      ) : (
        <ReferralCards referrals={referrals} cardsByHolder={cardsByHolder} />
      )}
    </div>
  );
};

export default ReferralsPage;
