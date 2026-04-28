import { useState, useMemo } from "react";
import { Card } from "../types/cards-types";

type Filters = {
  cardName: string;
  cardType: string;
  status: string;
  annualFee: string;
};

const ISSUER_NAME_ALIASES: Record<string, string[]> = {
  capone: ["Capital One", "Cap One"],
  amex: ["American Express", "AmEx"],
  chase: ["JP Morgan Chase", "Chase Bank"],
  citi: ["Citibank", "Citi"],
};

const normalizeSearchValue = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const getIssuerSearchValue = (issuerName: string): string => {
  const normalizedIssuerName = normalizeSearchValue(issuerName);
  const aliases = ISSUER_NAME_ALIASES[normalizedIssuerName] || [];

  return [issuerName, ...aliases].join(" ");
};

const useCardsFilter = (initialData: Card[]) => {
  const [filters, setFilters] = useState<Filters>({
    cardName: "",
    cardType: "",
    status: "",
    annualFee: "",
  });

  function filterReturnHandler(
    property: string,
    value: string,
    card: Card,
  ): boolean {
    const returnValue =
      property === "cardName"
        ? `${getIssuerSearchValue(card.issuer.name)} ${card.card}`
        : property === "annualFee"
          ? Number(card[property]) > 0 && card["status"] === "open"
            ? "show"
            : ""
          : card[property];

    return returnValue.toLowerCase().includes(value.toLowerCase());
  }

  const filteredData = useMemo(() => {
    const applyFilters = (card: Card): boolean => {
      return Object.entries(filters).every(([property, value]) =>
        filterReturnHandler(property, value, card),
      );
    };
    return initialData.filter(applyFilters);
  }, [initialData, filters]);

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
