const fs = require("fs-extra");
const { stringify } = require("csv-stringify");
const { uid } = require("uid");
const _ = require("lodash");

const ISSUERS = [
  { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
  { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
  { name: "CapOne", img: "https://i.imgur.com/u3Rr8rT.png" },
  { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
  { name: "Citi", img: "" },
  { name: "WellsFargo", img: "" },
];

const PROGRAMS = [
  {
    id: 1,
    type: 'airlines',
    name: 'American Aadvantage',
    img: 'https://i.imgur.com/Pc1I7uX.png'
  },
  {
    id: 2,
    type: 'airlines',
    name: 'United MileagePlus',
    img: 'https://i.imgur.com/znFTwQ1.png'
  },
  {
    id: 3,
    type: 'airlines',
    name: 'SouthWest',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 4,
    type: 'airlines',
    name: 'Delta',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 5,
    type: 'airlines',
    name: 'Turkish Airlines',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 6,
    type: 'airlines',
    name: 'Etihad Guest',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 7,
    type: 'airlines',
    name: 'British Airways',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 8,
    type: 'airlines',
    name: 'Qatar Airways',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 9,
    type: 'airlines',
    name: 'Singapore Air',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 10,
    type: 'airlines',
    name: 'Korean Skypass',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 11,
    type: 'airlines',
    name: 'Air France Flying Blue',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 12,
    type: 'airlines',
    name: 'Frontier',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 13,
    type: 'airlines',
    name: 'Asiana Airlines',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 14,
    type: 'airlines',
    name: 'Qantas',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 15,
    type: 'airlines',
    name: 'ANA Mileage Club',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 16,
    type: 'airlines',
    name: 'Alaska Airlines',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 17,
    type: 'airlines',
    name: 'Hawaiian Airlines',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 18,
    type: 'misc',
    name: 'AwardWallet',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 19,
    type: 'misc',
    name: 'Priority Pass',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 20,
    type: 'misc',
    name: 'AA eShopping',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 21,
    type: 'misc',
    name: 'Global Entry',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 22,
    type: 'misc',
    name: 'Hertz Rentals',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 23,
    type: 'hotels',
    name: 'IHG',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 24,
    type: 'hotels',
    name: 'Hilton Honors',
    img: 'https://i.imgur.com/3A83gV6.png'
  },
  {
    id: 25,
    type: 'hotels',
    name: 'Club Carlson',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 26,
    type: 'hotels',
    name: 'Marriott/SPG',
    img: 'https://i.imgur.com/B7Jvm5b.png'
  },
  {
    id: 27,
    type: 'hotels',
    name: 'Hyatt',
    img: 'https://i.imgur.com/UnaXElg.png'
  }
]

const slugify = (str) => {
  const whitespacePattern = /[\s-]+/g;
  const nonLatinPattern = /[^\w-]/g;
  return str
    .trim()
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(nonLatinPattern, " ")
    .replace(whitespacePattern, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

function formatDate(dateStr) {
  if (dateStr.length === 0 || dateStr.length === undefined) return ""

  const dateSplit = dateStr.split("-");

  if(dateSplit[0].length === 4) {
    const year = dateSplit.shift()
    dateSplit.push(year)
  }
  const formattedMonth = dateSplit[0].length === 1 ? `0${dateSplit[0]}` : dateSplit[0] 
  const formattedDay = dateSplit[1].length === 1 ? `0${dateSplit[1]}` : dateSplit[1] 
  return `${dateSplit[2]}-${formattedMonth}-${formattedDay}`;
}


const directory = (folder) => {
  return Object.freeze({
    empty: () => fs.emptyDirSync(folder),
  });
};

const jsonFile = (filePath) => {
  return Object.freeze({
    // TYPE Question -> What should the type of the data parameter be?
    // How do we make it so this can accept different data of different type
    write: (data) => fs.writeJSONSync(filePath, data, { spaces: 1 }),
    read: () => {
      try {
        return fs.readJSONSync(filePath);
      } catch (err) {
        console.log(err);
      }
    },
  });
};

const csvFile = (filePath) => {
  return Object.freeze({
    write: (data) => {
      try {
        stringify(
          data.entities,
          {
            header: true,
          },
          (err, output) => {
            fs.writeFileSync(filePath, output);
          }
        );
      } catch (err) {
        console.log(err);
        throw Error("Error writing CSV");
      }
    },
  });
};

const fooFile = jsonFile("/Users/su23140/Developer/personal/projects/cc-tracker-deploy/assets/foo.json")
const baseData = jsonFile('/Users/su23140/Developer/personal/projects/cc-tracker-deploy/assets/baseData.json')

const test = baseData.read();

console.log(test.length);

// const withUid = test.map(card => {
//   const keysSorted = _.chain(card).toPairs().sortBy(0).fromPairs().value()
//   const inquiriesSplit = keysSorted.inquiries.split(' , ')
//   const inqObj = {
//     experian: inquiriesSplit.includes('Experian'),
//     equifax: inquiriesSplit.includes('Equifax'),
//     transunion: inquiriesSplit.includes('Transunion')
//   }

//   const issuerObj = ISSUERS.find(issuer => issuer.name === keysSorted.issuer)
//   const id = slugify(
//     issuerObj.name + " " + card.card + " " + card.userId + " " + uid()
//   )

//   return {
//     ...keysSorted,
//     inquiries: inqObj,
//     issuer: issuerObj,
//     id
//   }
// })

const loyaltyWithUid = test.map(loyalty => {
  const keysSorted = _.chain(loyalty).toPairs().sortBy(0).fromPairs().value()

  const programObj = PROGRAMS.find(p => p.id === keysSorted.program)

  
  const id = slugify(
    programObj.name + "-" + loyalty.userId + "-" + uid()
  )

  console.log({id});

  return {
    ...keysSorted,
    program: programObj,
    id

  }
})

fooFile.write(_.keyBy(loyaltyWithUid, "id"))
