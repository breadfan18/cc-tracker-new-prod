
const testCard = {
  annualFee: "595",
  appDate: "2023-07-03",
  card: "Platinum",
  cardType: "Personal",
  cardholder: "Jess Elle",
  creditLine: "15000",
  id: "amex-platinum-4-178b53dc9c5",
  inquiries: {
    equifax: true,
    experian: false,
    transunion: true,
  },
  issuer: {
    img: "https://i.imgur.com/1XOuPt8.png",
    name: "Amex",
  },
  nextFeeDate: "2023-09-02",
  signupBonus: "100,000 Points",
  spendBy: "2023-08-08",
  spendReq: "5000",
  status: "open",
  userId: 4,
};

// function formatDate(dateStr) {
//   if (dateStr.length === 0) return ""
//   const dateSplit = dateStr.split("-");
//   const formattedMonth = dateSplit[0].length === 1 ? `0${dateSplit[0]}` : dateSplit[0] 
//   const formattedDay = dateSplit[1].length === 1 ? `0${dateSplit[1]}` : dateSplit[1] 
//   return `${dateSplit[2]}-${formattedMonth}-${formattedDay}`;
// }

// console.log(formatDate('2-4-2016'));
const arr = [1,2,3]
const firstElem = arr.shift()

arr.push(firstElem)

console.log(arr);