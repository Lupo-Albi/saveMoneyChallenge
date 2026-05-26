// Date Settings
const initialDate = new Date('2026-01-01T00:00:00-03:00');
const initialDateInMs = initialDate.getTime();
const finalDate = new Date('2026-12-31T00:00:00-03:00');
const finalDateInMs = finalDate.getTime();

if (finalDateInMs < initialDateInMs) {
  console.log("finalDate cannot be prior to initialDate");
  return;
}

// Value settings
const initialInvestment = 50;
const increment = 1;
const timeSpanInDays = 7;
const timeSpanInMs = timeSpanInDays * 24 * 60 * 60 * 1000;

if (initialInvestment <= 0 || timeSpanInDays <= 0 || increment < 0) {
    console.log(`It's not possible to save ${initialInvestment} with ${increment} increment in the time span of ${timeSpanInDays} days. Try positive values.`);
}

const dateSettings = {
  initialDateInMs,
  finalDateInMs,
  today: (new Date()).setHours(0, 0, 0, 0),
  timeSpanInMs
};

const valueSetting = {
  initialInvestment,
  increment,
}

const total = getTotalSavings(dateSettings, valueSetting);
const { nextDepositDate, nextDepositValue } = checkNextDeposit(dateSettings, valueSetting);

console.log(`Expected total savings: ${total}`);

if (!nextDepositDate && !nextDepositDate) {
  console.log('Your goal was achieved! No more deposits do be made.')
  return;
} else {
  console.log(`** Upcoming deposit **`);
  console.log(`Date: ${nextDepositDate}`);
  console.log(`Value: ${nextDepositValue}`);
  return;
}

function getTotalSavings(dateSettings, valueSetting) {
  const { initialDateInMs, timeSpanInMs, finalDateInMs } = dateSettings;
  const { initialInvestment, increment } = valueSetting;


  let savings = 0;
  let dateToCheck = initialDateInMs;
  let currentInvestment = initialInvestment;

  do {
    savings += currentInvestment;
    dateToCheck += timeSpanInMs;
    currentInvestment += increment;
  } while (dateToCheck < finalDateInMs);

  return savings;
}

function checkNextDeposit(dateSettings, valueSetting) {
  const { initialDateInMs, finalDateInMs, today, timeSpanInMs } = dateSettings;
  const { initialInvestment, increment } = valueSetting;

  if (today > finalDateInMs) {
    return { nextDepositDate: '', nextDepositValue: 0 };
  }

  let currentInvestment = initialInvestment;
  let dateToCheck = initialDateInMs;

  do {
    dateToCheck += timeSpanInMs;
    currentInvestment += increment
  } while (dateToCheck < today);

  return { 
    nextDepositDate: (new Date(dateToCheck)).toLocaleDateString(),
    nextDepositValue: currentInvestment + increment
  }
}