import { useState } from "react";

export const useFilteredData = (cardData) => {
  const [cardsFilter, setCardsFilter] = useState({
    query: "",
    cardList: [],
  });

  const filterCards = (query) => {
    return cardData.filter((card) => {
      const fullCardName = card.issuer.name + " " + card.card;
      return fullCardName.toLowerCase().includes(query.toLowerCase());
    });
  };

  const handleCardsFilter = (e) => {
    const filteredCards =
      e.target.value === "" ? cardData : filterCards(e.target.value);
    setCardsFilter({
      query: e.target.value,
      cardList: filteredCards,
    });
  };

  return {
    cardsFilter,
    setCardsFilter,
    handleCardsFilter,
    filterCards,
  };
};
