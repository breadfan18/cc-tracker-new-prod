import React, { useContext, useEffect, useState } from "react";
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
import SelectInput from "../common/SelectInput";
import CardList from "../cards/CardListTable";
import { WindowWidthContext } from "../App";
import CardListCards from "../cards/CardListCards";
import { loadCardholdersFromFirebase } from "../../redux/actions/cardholderActions";
import { useUser } from "reactfire";
import _ from "lodash";

const FiveTwentyFourPage = () => {
  const dispatch = useDispatch();
  const windowWidth = useContext(WindowWidthContext);
  const [selectedCardHolder, setSelectedCardholder] = useState();
  const { status, data: user } = useUser();
  const cards = useSelector((state) => sortCardsByDate(state.cards));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const cardholders = useSelector((state) =>
    _.sortBy(state.cardholders, (o) => o.isPrimary)
  );

  const cardsByHolder = cardholders.reduce((obj, holder) => {
    obj[holder.id] = cards.filter((card) => card.userId === holder.id);
    return obj;
  }, {});

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadCardsFromFirebase(user.uid));
    }

    if (cardholders.length === 0 && user) {
      dispatch(loadCardholdersFromFirebase(user.uid));
    }
  }, [status, user]);

  const handleChange = (e) => setSelectedCardholder(e.target.value);

  const cardholdersToDisplay =
    selectedCardHolder === undefined || selectedCardHolder === ""
      ? cardholders.map((holder) => holder.id)
      : [selectedCardHolder];

  const cardholders524Status = cardholdersToDisplay.map((holder) => {
    const cardholderName = cardholders.find((u) => u.id === holder).name;
    const dateSortedCards524 = pipe((cards) => {
      return cards.filter(
        (card) =>
          wasCardOpenedWithinLast24Months(card.appDate) &&
          card.cardType !== "Business"
      );
    }, sortCardsByDate)(cardsByHolder[holder]);

    const cardsListComponent =
      dateSortedCards524.length > 0 ? (
        windowWidth > 1000 ? (
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
            key={holder.id}
          />
        </>
      ) : (
        "This user has opened 0 personal cards in the last 24 months"
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SelectInput
            name="id"
            label="Select Card Holder to View"
            value={selectedCardHolder}
            defaultOption="All Card Holders"
            options={cardholders.map((user) => ({
              value: user.id,
              text: user.name,
            }))}
            onChange={handleChange}
            disableDefaultOption={false}
            // error={errors.author}
          />
          <hr />
          {cardholders524Status}
        </>
      )}
    </div>
  );
};

export default FiveTwentyFourPage;
