import { useState } from "react";

export const useFilteredData = (cardData) => {
  const [cardsFilter, setCardsFilter] = useState({
    query: "",
    cardList: [],
  });

  const handleCardsFilter = (e) => {
    const filteredCards = cardData.filter((card) => {
      if (e.target.value === "") return cardData;
      const fullCardName = card.issuer.name + " " + card.card;
      return fullCardName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setCardsFilter({
      query: e.target.value,
      cardList: filteredCards,
    });
  };

  return {
    cardsFilter,
    setCardsFilter,
    handleCardsFilter,
  };
};
