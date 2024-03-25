export const getReferralData = (referral, cardsByHolder) => {
  const {
    id,
    referredCard,
    referrerId,
    referralLink,
    referringCardId,
    referralDate,
    issuer,
  } = referral;
  const cardsForReferrer = cardsByHolder[referrerId];
  const referringCard = cardsForReferrer.find(
    (card) => referringCardId === card.id
  );

  return {
    id,
    referredCard,
    referrerId,
    referralLink,
    referringCardId,
    referralDate,
    issuer,
    cardsForReferrer,
    referringCard,
    referringCardholder: referringCard.cardholder,
  };
};
