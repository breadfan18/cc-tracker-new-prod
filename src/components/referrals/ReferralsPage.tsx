import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { loadReferralsFromFirebase } from "../../redux/actions/referralActions";
import { useUser } from "reactfire";
import ReferralsList from "./ReferralsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { sortReferralsByDate } from "../../helpers";
import ReferralAddEditModal from "./ReferralAddEditModal";
import ReferralCards from "./ReferralCards";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import useWindhowWidth from "../../hooks/windowWidth";
import { MainReduxState } from "../../types/redux";

const ReferralsPage = () => {
  const { isDesktop } = useWindhowWidth();
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cards = useSelector((state: MainReduxState) => state.cards);
  const cardholders = useSelector((state: MainReduxState) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );
  const referrals = useSelector((state: MainReduxState) =>
    sortReferralsByDate(state.referrals)
  );

  const loading = useSelector(
    (state: MainReduxState) =>
      state.apiCallsInProgress > 0 ||
      cardholders.length === 0 ||
      referrals.length === 0 ||
      cards.length === 0
  );

  useEffect(() => {
    if (!user || status !== "success") return;

    if (referrals.length === 0) {
      dispatch(loadReferralsFromFirebase(user.uid));
    }
    if (cardholders.length === 0) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
    if (cards.length === 0) {
      dispatch(loadCardsFromFirebase(user.uid));
    }
  }, [
    dispatch,
    referrals.length,
    cardholders.length,
    cards.length,
    status,
    user,
  ]);

  const cardsByHolder = _.groupBy(cards, (o) => o.userId);

  return (
    <div
      style={{ maxWidth: "1600px", margin: "0 auto" }}
      className="referralsPageContainer"
    >
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Referrals</h2>
        <ReferralAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : isDesktop ? (
        <ReferralsList referrals={referrals} cardsByHolder={cardsByHolder} />
      ) : (
        <ReferralCards referrals={referrals} cardsByHolder={cardsByHolder} />
      )}
    </div>
  );
};

export default ReferralsPage;
