import { useEffect, useMemo, useState } from "react";
import { Card } from "../types/cards-types";

type Filters = {
  cardName: string;
  cardType: string;
  status: string;
  annualFee: string;
};

const FILTERS_STORAGE_KEY = "selectedCardFilters";

const DEFAULT_FILTERS: Filters = {
  cardName: "",
  cardType: "",
  status: "",
  annualFee: "",
};

const getStoredFilters = (): Filters => {
  try {
    const rawFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (!rawFilters) {
      return DEFAULT_FILTERS;
    }

    const parsedFilters = JSON.parse(rawFilters);

    return {
      cardName:
        typeof parsedFilters?.cardName === "string"
          ? parsedFilters.cardName
          : "",
      cardType:
        typeof parsedFilters?.cardType === "string"
          ? parsedFilters.cardType
          : "",
      status:
        typeof parsedFilters?.status === "string" ? parsedFilters.status : "",
      annualFee:
        typeof parsedFilters?.annualFee === "string"
          ? parsedFilters.annualFee
          : "",
    };
  } catch {
    return DEFAULT_FILTERS;
  }
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
  const [filters, setFilters] = useState<Filters>(getStoredFilters);

  useEffect(() => {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

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
    setFilters(DEFAULT_FILTERS);
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
