import { MainReduxState } from "../../types/redux";

const initialState: MainReduxState = {
  cards: [],
  loyaltyData: [],
  cardholders: [],
  referrals: [],
  notifications: [],
  theme: "light",
  userLoyaltyPrograms: [],
  userIssuers: [],
};

export default initialState;
