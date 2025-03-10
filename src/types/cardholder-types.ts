import { Card } from "./cards-types";
import { LoyaltyData } from "./loyalty-types";

export type Cardholder = {
  id: string;
  img: string;
  name: string;
  email?: string;
  isPrimary?: boolean;
  hasCards?: boolean;
  hasLoyalty?: boolean;
};

export type CardholderForModalType = {
  id: string;
  firstName: string;
  lastName: string;
  img: string;
  imgFile?: any;
};

type MiniTableProps<T, K extends string> = {
  [key in K]: T;
} & {
  layout?: string;
  isLoadedInCard?: boolean;
};

export type CardsDataMiniTableProps = MiniTableProps<Card[], "cards">;

export type LoyaltyDataMiniTableProps = MiniTableProps<
  LoyaltyData[],
  "loyaltyData"
>;

export type InquiriesMiniTableProps = MiniTableProps<
  { [key in "experian" | "equifax" | "transunion"]: number },
  "inquiries"
>;

export type CardsByHolder = {
  [key: string]: Card[];
};

export type LoyaltyByHolder = {
  [key: string]: LoyaltyData[];
};

export type InquiriesByHolder = {
  [key in "experian" | "equifax" | "transunion"]: boolean;
};
