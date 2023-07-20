const PROGRAMS = [
  {
    id: "1",
    type: "airlines",
    name: "American Aadvantage",
    img: "https://i.imgur.com/Pc1I7uX.png"
  },
  {
    id: "2",
    type: "airlines",
    name: "Unietd MileagePlus",
    img: "https://i.imgur.com/znFTwQ1.png"
  },
  {
    id: "3",
    type: "airlines",
    name: "SouthWest",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "4",
    type: "airlines",
    name: "Delta",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "5",
    type: "airlines",
    name: "Turkish Airlines",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "6",
    type: "airlines",
    name: "Etihad Guest",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "7",
    type: "airlines",
    name: "British Airways",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "8",
    type: "airlines",
    name: "Qatar Airways",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "9",
    type: "airlines",
    name: "Singapore Air",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "10",
    type: "airlines",
    name: "Korean Skypass",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "11",
    type: "airlines",
    name: "Air France Flying Blue",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "12",
    type: "airlines",
    name: "Frontier",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "13",
    type: "airlines",
    name: "Asiana Airlines",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "14",
    type: "airlines",
    name: "Qantas",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "15",
    type: "airlines",
    name: "ANA Mileage Club",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "16",
    type: "airlines",
    name: "Alaska Airlines",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "17",
    type: "airlines",
    name: "Hawaiian Airlines",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "18",
    type: "misc",
    name: "AwardWallet",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "19",
    type: "misc",
    name: "Priority Pass",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "20",
    type: "misc",
    name: "AA eShopping",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "21",
    type: "misc",
    name: "Global Entry",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "22",
    type: "misc",
    name: "Hertz Rentals",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "23",
    type: "hotels",
    name: "IHG",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "24",
    type: "hotels",
    name: "Hilton Honors",
    img: "https://i.imgur.com/3A83gV6.png"
  },
  {
    id: "25",
    type: "hotels",
    name: "Club Carlson",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "26",
    type: "hotels",
    name: "Marriott/SPG",
    img: "https://i.imgur.com/B7Jvm5b.png"
  },
  {
    id: "27",
    type: "hotels",
    name: "Hyatt",
    img: "https://i.imgur.com/UnaXElg.png"
  }
]

const foo = PROGRAMS.map(p => ({
  ...p,
  id: parseInt(p.id)
}))

console.log(foo);