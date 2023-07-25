function getRandomDate(startDate, endDate) {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  return randomDate.toISOString().slice(0, 10);
}

const startDate = new Date("2021-08-24");
const endDate = new Date();
const randomDate = getRandomDate(startDate, endDate);
