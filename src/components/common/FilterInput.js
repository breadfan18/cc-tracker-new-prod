import React from "react";
import { useFilteredData } from "../../hooks/filterCards";

export default function FilterInput(data, dataType, width) {
  const { cardsFilter, handleCardsFilter } = useFilteredData(data);

  return (
    <input
      type="search"
      value={cardsFilter.query}
      onChange={handleCardsFilter}
      placeholder={`Filter by card name.`}
      className="cardTabsFilterInput"
      style={{ width: width }}
    />
  );
}
