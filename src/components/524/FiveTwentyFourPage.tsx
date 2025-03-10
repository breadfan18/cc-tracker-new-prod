import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import { FiveTwentyFourStatus } from "./FiveTwentyFourStatus";
import {
  pipe,
  sortCardsByDate,
  wasCardOpenedWithinLast24Months,
} from "../../helpers";
import FiveTwentyFourAccordion from "./FiveTwentyFourAccordion";
import CardList from "../cards/CardListTable";
import CardListCards from "../cards/CardListCards";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";
import _ from "lodash";
import useWindhowWidth from "../../hooks/windowWidth";
import { MainReduxState } from "../../types/redux";
import { Card } from "../../types/cards-types";

const FiveTwentyFourPage = () => {
  const dispatch = useDispatch();
  const { isDesktop } = useWindhowWidth();
  const { status, data: user } = useUser();
  const cards = useSelector((state: MainReduxState) =>
    sortCardsByDate(state.cards)
  );
  const loading = useSelector(
    (state: MainReduxState) => state.apiCallsInProgress > 0
  );
  const cardholders = useSelector((state: MainReduxState) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );

  const cardsByHolder = cardholders.reduce((obj, holder) => {
    obj[holder.id] = cards.filter((card) => card.userId === holder.id);
    return obj;
  }, {});

  useEffect(() => {
    if (!user || status !== "success") return;
    if (cards.length === 0) {
      dispatch(loadCardsFromFirebase(user.uid));
    }

    if (cardholders.length === 0) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
  }, [cardholders.length, cards.length, dispatch, status, user]);

  const cardholders524Status = _.map(cardholders, "id").map((holder) => {
    const cardholderName = cardholders.find((u) => u.id === holder)?.name;
    const dateSortedCards524 = pipe((cards: Card[]) => {
      return cards.filter(
        (card) =>
          wasCardOpenedWithinLast24Months(card.appDate) &&
          card.cardType !== "Business"
      );
    }, sortCardsByDate)(cardsByHolder[holder]);

    const cardsListComponent =
      dateSortedCards524.length > 0 ? (
        isDesktop ? (
          <CardList
            cards={dateSortedCards524}
            showEditDelete={false}
            showUser={false}
            showCompactTable={true}
          />
        ) : (
          <CardListCards
            cards={dateSortedCards524}
            showEditDelete={false}
            showUserName={false}
          />
        )
      ) : null;

    const five24TrackerElem =
      dateSortedCards524.length > 0 ? (
        <>
          <FiveTwentyFourStatus
            percent={(dateSortedCards524.length / 5) * 100}
            label={`${dateSortedCards524.length}/5`}
            key={holder}
          />
        </>
      ) : (
        <>This user has opened 0 personal cards in the last 24 months</>
      );

    return (
      <>
        <FiveTwentyFourAccordion
          five24Cards={cardsListComponent}
          user={cardholderName}
          showCards={dateSortedCards524.length > 0}
          fiveTwentyFourStatusElement={five24TrackerElem}
        />
        <br />
      </>
    );
  });

  return (
    <div className="fiveTwentyFourContainer">
      <h2 className="sectionHeaders">5/24 Status</h2>
      <br />
      {loading ? <Spinner /> : <>{cardholders524Status}</>}
    </div>
  );
};

export default FiveTwentyFourPage;
