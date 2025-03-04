import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { APP_COLOR_BLUE, DELETE_MODAL_TYPES } from "../../constants";
import CardholderAddEditModal from "./CardHolderAddEditModal";
import CardsDataMiniTable from "./CardsDataMiniTable";
import LoyaltyDataMiniTable from "./LoyaltyDataMiniTable";
import CardholderPhoto from "./CardholderPhoto";
import InquiriesMiniTable from "./InquiriesMiniTable";
import useWindhowWidth from "../../hooks/windowWidth";
import {
  Cardholder,
  CardsByHolder,
  InquiriesByHolder,
  LoyaltyByHolder,
} from "../../types/cardholder-types";

type CardholderCardsProps = {
  cardholders: Cardholder[];
  cardsByHolder: CardsByHolder;
  loyaltyByHolder: LoyaltyByHolder;
  inquiriesByHolder: InquiriesByHolder;
};

export default function CardholderCards({
  cardholders,
  cardsByHolder,
  loyaltyByHolder,
  inquiriesByHolder,
}: CardholderCardsProps) {
  const { windowWidth } = useWindhowWidth();
  const cardWidth = windowWidth < 600 ? windowWidth : "25rem";
  const allCardholders = cardholders.map((holder) => {
    const cardsForThisHolder = cardsByHolder[holder.id];
    const loyaltyForThisHolder = loyaltyByHolder[holder.id];
    const inquiriesForThisHolder = inquiriesByHolder[holder.id];

    console.log(holder);

    return (
      <div className="cardholderCard" style={{ width: cardWidth }}>
        <div id="cardholderCardImgSection">
          <CardholderPhoto img={holder.img} heightAndWidth="6rem" imgOnCard />
          <div id="editDeleteOnCardholderCards">
            <CardholderAddEditModal
              isNewCardholder={false}
              cardholder={holder}
              disableBtn={holder.isPrimary}
              showAsRectangle
            />
            <ConfirmDeleteModal
              data={holder}
              dataType={DELETE_MODAL_TYPES.cardholder}
              disableBtn={
                holder.hasCards || holder.hasLoyalty || holder.isPrimary
              }
              showAsRectangle
            />
          </div>
        </div>
        <div style={{ marginLeft: "10px", flex: 1 }}>
          <p style={{ color: APP_COLOR_BLUE }}>
            {holder.name} {holder.isPrimary && "(Primary)"}
          </p>
          <section className="cardholderCardDataSection">
            <CardsDataMiniTable cards={cardsForThisHolder} isLoadedInCard />
            <LoyaltyDataMiniTable
              loyaltyData={loyaltyForThisHolder}
              isLoadedInCard
            />
            <InquiriesMiniTable
              inquiries={inquiriesForThisHolder}
              isLoadedInCard
            />
          </section>
        </div>
      </div>
    );
  });

  return (
    <div id="cardCardContainer" style={{ padding: 0 }}>
      {allCardholders}
    </div>
  );
}
