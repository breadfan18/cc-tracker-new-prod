import { useMemo, useState } from "react";
import { LoyaltyData } from "../types/loyalty-types";
import { Card } from "../types/cards-types";

type SortDirection = "ascending" | "descending" | "";

type SortConfig = {
  key: string;
  direction: SortDirection;
};

export const isLoyaltyData = (
  data: Card | LoyaltyData
): data is LoyaltyData => {
  return "program" in data;
};

export const isCardData = (data: Card | LoyaltyData): data is Card => {
  return "annualFee" in data;
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
      const getSortValue = (item: Card | LoyaltyData) => {
        if (isLoyaltyData(item) && sortConfig.key === "program") {
          return item.program.name;
        }
        return item[sortConfig.key as keyof (Card | LoyaltyData)];
      };

      const a_value = getSortValue(a);
      const b_value = getSortValue(b);

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
