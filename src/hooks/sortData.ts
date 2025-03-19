import { useMemo, useState } from "react";
import { LoyaltyData } from "../types/loyalty-types";
import { Card } from "../types/cards-types";
import { CARD_DATA_KEYS, LOYALTY_DATA_KEYS } from "../constants";

type SortDirection = "ascending" | "descending" | "";

type SortConfig = {
  key: string;
  direction: SortDirection;
};

export const isLoyaltyData = (
  data: Card | LoyaltyData
): data is LoyaltyData => {
  return LOYALTY_DATA_KEYS.program in data;
};

export const isCardData = (data: Card | LoyaltyData): data is Card => {
  return CARD_DATA_KEYS.annualFee in data;
};

const getSortValue = (item: Card | LoyaltyData, sortConfig: SortConfig) => {
  if (isLoyaltyData(item)) {
    if (sortConfig.key === LOYALTY_DATA_KEYS.program) {
      return item.program.name;
    }
  } else if (sortConfig.key === CARD_DATA_KEYS.creditLine) {
    return parseInt(item[CARD_DATA_KEYS.creditLine]) || 0;
  } else if (sortConfig.key === CARD_DATA_KEYS.annualFee) {
    if (item.status === "downgraded") {
      return -1;
    } else if (item.status === "closed") {
      return -2;
    } else if (item.status === "open") {
      return parseInt(item[CARD_DATA_KEYS.annualFee]) || 0;
    }
  }
  return item[sortConfig.key];
};

export const useSortableData = (
  data: (Card | LoyaltyData)[]
): { data: (Card | LoyaltyData)[]; requestSort: (key: string) => void } => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const a_value = getSortValue(a, sortConfig);
      const b_value = getSortValue(b, sortConfig);

      if (a_value < b_value) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a_value > b_value) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: SortDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { data: sortedData, requestSort };
};
