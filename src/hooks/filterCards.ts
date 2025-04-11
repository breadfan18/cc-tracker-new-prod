import { useState, useMemo } from "react";
import { Card } from "../types/cards-types";

type Filters = {
  cardName: string;
  cardType: string;
  status: string;
  annualFee: string;
};

const useCardsFilter = (initialData: Card[]) => {
  const data = [...initialData];
  const [filters, setFilters] = useState<Filters>({
    cardName: "",
    cardType: "",
    status: "",
    annualFee: "",
  });

  function filterReturnHandler(
    property: string,
    value: string,
    card: Card
  ): boolean {
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

  const applyFilters = (card: Card): boolean => {
    return Object.entries(filters).every(([property, value]) =>
      filterReturnHandler(property, value, card)
    );
  };

  const filteredData = useMemo(
    () => data.filter(applyFilters),
    [data, filters]
  );

  const setFilter = (property: string, value: string): void => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const resetFilters = (): void => {
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
    setCardNameFilter: (value: string) => setFilter("cardName", value),
    setCardTypeFilter: (value: string) => setFilter("cardType", value),
    setStatusFilter: (value: string) => setFilter("status", value),
    setAnnualFeeFilter: (value: string) => setFilter("annualFee", value),
    resetFilters,
  };
};

export default useCardsFilter;
