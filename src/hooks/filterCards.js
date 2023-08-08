import { useState } from "react";

export const useFilteredData = (cardData) => {
  const [filter, setFilter] = useState({
    query: "",
    cardList: [],
  });

  const handleFilter = (e) => {
    const filteredCards = cardData.filter((card) => {
      if (e.target.value === "") return cardData;
      const fullCardName = card.issuer.name + " " + card.card;
      return fullCardName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter({
      query: e.target.value,
      cardList: filteredCards,
    });
  };

  return { filter, setFilter, handleFilter };
};
