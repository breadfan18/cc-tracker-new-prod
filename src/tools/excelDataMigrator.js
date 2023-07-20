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

const withUid = test.map(card => {
  const keysSorted = _.chain(card).toPairs().sortBy(0).fromPairs().value()
  const inquiriesSplit = keysSorted.inquiries.split(' , ')
  const inqObj = {
    experian: inquiriesSplit.includes('Experian'),
    equifax: inquiriesSplit.includes('Equifax'),
    transunion: inquiriesSplit.includes('Transunion')
  }

  const issuerObj = ISSUERS.find(issuer => issuer.name === keysSorted.issuer)
  const id = slugify(
    issuerObj.name + " " + card.card + " " + card.userId + " " + uid()
  )

  return {
    ...keysSorted,
    inquiries: inqObj,
    issuer: issuerObj,
    id
  }
})

fooFile.write(_.keyBy(withUid, "id"))
