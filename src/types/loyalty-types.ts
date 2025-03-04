export type LoyaltyData = {
  accountHolder: string;
  id: string;
  loginId: string;
  loyaltyType: string;
  memberId: string;
  password: string;
  program: {
    id: string;
    img: string;
    name: string;
    url?: string;
  };
  rewardsBalance: string;
  rewardsExpiration: string;
  userId: string;
};

export type UserLoyaltyPrograms = {
  id: string;
  img: string;
  name: string;
  type: string;
  url?: string;
};
