import { CardsByHolder } from "../types/cardholder-types";
import { Card } from "../types/cards-types";
import { Referral } from "../types/referral-types";

type ReferralData = Referral & {
  cardsForReferrer: Card[];
  referringCard?: Card;
  referringCardholder: string;
};

export const getReferralData = (
  referral: Referral,
  cardsByHolder: CardsByHolder
): ReferralData => {
  const cardsForReferrer = cardsByHolder[referral.referrerId];

  const referringCard = cardsForReferrer.find(
    (card) => referral.referringCardId === card.id
  );

  return {
    ...referral,
    cardsForReferrer,
    referringCard,
    referringCardholder: referringCard?.cardholder || "",
  };
};
