import { useState, useMemo } from "react";

const useCardsFilter = (initialData) => {
  const data = [...initialData];
  const [filters, setFilters] = useState({
    cardName: "",
    cardType: "",
    status: "",
  });

  const applyFilters = (card) => {
    return Object.entries(filters).every(([property, value]) => {
      const itemValue =
        property === "cardName"
          ? `${card.issuer.name} ${card.card}`
          : card[property];

      return itemValue.toLowerCase().includes(value.toLowerCase());
    });
  };

  const filteredData = useMemo(
    () => data.filter(applyFilters),
    [data, filters]
  );

  const setFilter = (property, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const resetFilters = () => {
    setFilters({
      cardName: "",
      cardType: "",
      status: "",
    });
  };

  return {
    filteredData,
    filters,
    setCardNameFilter: (value) => setFilter("cardName", value),
    setCardTypeFilter: (value) => setFilter("cardType", value),
    setStatusFilter: (value) => setFilter("status", value),
    resetFilters,
  };
};

export default useCardsFilter;
