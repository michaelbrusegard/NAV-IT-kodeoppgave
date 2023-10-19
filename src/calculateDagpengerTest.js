// Import the 'assert' module used for testing
import assert from 'assert';
// Import the functions to be tested
import calculateDagpenger from './calculateDagpenger.js';
import retrieveGrunnbelopet from './retrieveGrunnbelopet.js';

// Working days in a year is 260 according to the assignment
const workingDaysInAYear = 260;
// I interpret the input to be an array of the last 3 years of income starting with the most recent year this was the example values given:
const example = [500000, 450000, 400000];
// I fetch the G value from the API and store it in a variable in the first test case
let G;

async function runTests() {
  // Test case 1: Test retrieveGrunnbelopet
  try {
    G = await retrieveGrunnbelopet();
    assert.strictEqual(typeof G, 'number', 'G should be a number');
    assert.strictEqual(G > 0, true, 'G should be greater than 0');
    // I assume grunnbeløpet from the https://www.nav.no/grunnbelopet 2023 value for this test
    assert.strictEqual(G == 118620, true, 'G should be equal to 118620 (Grunnbeløpet from the https://www.nav.no/grunnbelopet 2023 value)');
    console.log('Test case 1: Test retrieveGrunnbelopet');
    console.log('Result:', G);
    console.log('------------------------');
  } catch (error) {
    console.error(error.message, 'G value is invalid (Make sure to update the test Grunnbeløp value if it is more recent than may 2024)');
  }

  // Test case 2: Eligible for dagpenger with sumIncome > 3G
  const input2 = example;
  const result2 = calculateDagpenger(input2);
  assert.strictEqual(result2.eligibleForDagpenger, true);
  assert.strictEqual(result2.dagsatsen, 1924);
  console.log('Test case 2: Eligible for dagpenger with sumIncome > 3G');
  console.log('Input:', input2);
  console.log('Result:', result2);
  console.log('------------------------');

  // Test case 3: Eligible for dagpenger with incomeLastYear > 1.5G
  const input3 = [180000, 80000, 75000];
  const result3 = calculateDagpenger(input3);
  assert.strictEqual(result3.eligibleForDagpenger, true);
  assert.strictEqual(result3.dagsatsen, 693);
  console.log('Test case 3: Eligible for dagpenger with incomeLastYear > 1.5G');
  console.log('Input:', input3);
  console.log('Result:', result3);
  console.log('------------------------');

  // Test case 4: Not eligible for dagpenger (below income thresholds)
  const input4 = [50000, 60000, 70000];
  const result4 = calculateDagpenger(input4);
  assert.strictEqual(result4.eligibleForDagpenger, false);
  assert.strictEqual(result4.dagsatsen, null);
  console.log('Test case 4: Not eligible for dagpenger (below income thresholds)');
  console.log('Input:', input4);
  console.log('Result:', result4);
  console.log('------------------------');

  // Test case 5: Eligible for dagpenger with sumIncome > 6G
  const input5 = [5000000, 5000000, 5000000];
  const result5 = calculateDagpenger(input5);
  assert.strictEqual(result5.eligibleForDagpenger, true);
  assert.strictEqual(result5.dagsatsen, Math.ceil((6 * G) / workingDaysInAYear));
  console.log('Test case 5: Eligible for dagpenger with sumIncome > 6G');
  console.log('Input:', input5);
  console.log('Result:', result5);
  console.log('------------------------');

  // Test case 6: Throws an error for incorrect input length
  const input6 = [500000, 450000];
  let result6;
  try {
    calculateDagpenger(input6);
    // If the function doesn't throw an error, the test fails
    assert.fail('Function should throw an error for incorrect input length');
  } catch (error) {
    // Ensure that the error message matches
    result6 = error.message;
    assert.strictEqual(error.message, 'Income data has to be defined for exactly the last 3 years.');
  }
  console.log('Test case 6: Throws an error for incorrect input length');
  console.log('Input:', input6);
  console.log('Result:', result6);
  console.log('------------------------');

  // Test case 7: Throws an error if input is less than 0
  const input7 = [500000, 450000, -400000];
  let result7;
  try {
    calculateDagpenger(input7);
    // If the function doesn't throw an error, the test fails
    assert.fail('Function should throw an error for incorrect input length');
  } catch (error) {
    // Ensure that the error message matches
    result7 = error.message;
    assert.strictEqual(error.message, 'Income cannot be below 0.');
  }
  console.log('Test case 7: Throws an error if input is less than 0');
  console.log('Input:', input7);
  console.log('Result:', result7);
  console.log('------------------------');

  console.log('All tests passed!');
}

// Run the tests
runTests();
