import { useState, useMemo } from "react";

const useCardsFilter = (initialData) => {
  const data = [...initialData];
  const [filters, setFilters] = useState({
    cardName: "",
    cardType: "",
    status: "",
    annualFee: "",
  });

  function filterReturnHandler(property, value, card) {
    const returnValue =
      property === "cardName"
        ? `${card.issuer.name} ${card.card}`
        : property === "annualFee"
        ? Number(card[property]) > 0 && card["status"] === "open"
          ? "show"
          : ""
        : card[property];

    return returnValue.toLowerCase().includes(value.toLowerCase());
  }

  const applyFilters = (card) => {
    return Object.entries(filters).every(([property, value]) =>
      filterReturnHandler(property, value, card)
    );
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
      annualFee: "",
    });
  };

  return {
    filteredData,
    filters,
    setCardNameFilter: (value) => setFilter("cardName", value),
    setCardTypeFilter: (value) => setFilter("cardType", value),
    setStatusFilter: (value) => setFilter("status", value),
    setAnnualFeeFilter: (value) => setFilter("annualFee", value),
    resetFilters,
  };
};

export default useCardsFilter;
