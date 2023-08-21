import fs from "fs-extra";
import { stringify } from "csv-stringify";
import { uid } from "uid";
import _ from "lodash";
import { PROGRAMS, ISSUERS, USERS } from "../constants";
import { slugify } from "../helpers";

function formatDate(dateStr) {
  if (dateStr.length === 0 || dateStr.length === undefined) return "";

  const dateSplit = dateStr.split("-");

  if (dateSplit[0].length === 4) {
    const year = dateSplit.shift();
    dateSplit.push(year);
  }
  const formattedMonth =
    dateSplit[0].length === 1 ? `0${dateSplit[0]}` : dateSplit[0];
  const formattedDay =
    dateSplit[1].length === 1 ? `0${dateSplit[1]}` : dateSplit[1];
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

const fooFile = jsonFile(
  "/Users/su23140/Developer/personal/projects/cc-tracker-deploy/assets/foo.json"
);
const baseData = jsonFile(
  "/Users/su23140/Developer/personal/projects/cc-tracker-deploy/assets/backup-data/allData_with_users_08162023.json"
);

const test = baseData.read();

const foo = _.values(
  test.users["iXoAbxO0hMNBUUCzMnpnSydNKZg1"].loyaltyData
).map((loyalty) => {
  const thisUser = USERS.find((u) => u.id === loyalty.userId).name;
  const newUserId = slugify(thisUser);
  console.log(newUserId);

  if (loyalty.cardholder === undefined) {
    return {
      ...loyalty,
      userId: newUserId,
      cardholder: thisUser,
    };
  }
  return {
    ...loyalty,
    userId: newUserId,
  };
});

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

// const loyaltyWithUid = test.map((loyalty) => {
//   const keysSorted = _.chain(loyalty).toPairs().sortBy(0).fromPairs().value();

//   const programObj = PROGRAMS.find((p) => p.id === keysSorted.program);

//   const id = slugify(programObj.name + "-" + loyalty.userId + "-" + uid());

//   console.log({ id });

//   return {
//     ...keysSorted,
//     program: programObj,
//     id,
//   };
// });

fooFile.write(_.keyBy(foo, "id"));
