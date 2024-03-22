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
import { calculateCurrentInquiries, sortReferralsByDate } from "../../helpers";
import ReferralAddEditModal from "./ReferralAddEditModal";

const ReferralsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cards = useSelector((state) => state.cards);
  const referrals = useSelector((state) =>
    sortReferralsByDate(state.referrals)
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
    <div className="cardHoldersContainer">
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

/* 
THINGS TO DO
- Setup firebase functions for referrals - DONE
- Setup redux - DONE
- Create referral form - DONE
- Create the referral add edit modal  - DONE
- Code the components 
- Referral form error handling
*/
