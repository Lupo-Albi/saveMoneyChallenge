const investment = 25;
const timeSpanInDays = 7;
const timeSpanInMs = timeSpanInDays * 24 * 60 * 60 * 1000
const initialDate = new Date('2026-01-01T00:00:00-03:00');
const initialDateInMs = initialDate.getTime();
const finalDate = new Date('2026-02-01T00:00:00-03:00');
const finalDateInMs = finalDate.getTime();

if (investment <= 0 || timeSpanInDays <= 0) {
    console.log(`It's not possible to save ${investment} in the time span of ${timeSpanInDays} days. Try positive values.`);
}

if (finalDateInMs < initialDateInMs) {
    console.log('finalDate cannot be prior to initialDate');
    return;
}

let savings = 0;
let timeTravel = initialDateInMs;

do {
  savings += investment;
  timeTravel += timeSpanInMs;
} while (timeTravel < finalDateInMs);

console.log(`Total savings: ${savings}`);