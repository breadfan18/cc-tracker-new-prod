import { uid } from "uid";
import { slugify } from "../helpers";
import { writeToFirebase } from "../tools/firebase";

const testCard = {
  appDate: "2023-01-01",
  issuer: {
    name: "Chase",
    img: "https://i.imgur.com/AsfYKFY.png",
  },
  card: "Test Card",
  cardType: "Personal",
  inquiries: {
    experian: true,
    equifax: true,
    transunion: false,
  },
  annualFee: 95,
  nextFeeDate: "2024-01-02",
  creditLine: "5000",
  spendReq: "3000",
  spendBy: "2023-04-15",
  signupBonus: "50,000 UR",
  bonusEarned: false,
  bonusEarnDate: "",
  status: "open",
  userId: 5,
};

const uuid = slugify(
  testCard.issuer.name +
    " " +
    testCard.card +
    " " +
    testCard.userId +
    " " +
    uid()
);

writeToFirebase("cards", testCard, uuid);
