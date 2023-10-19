import readline from 'readline';
import calculateDagpenger from './calculateDagpenger.js';

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an array to store the user's input values
const userInput = [];

function getUserInput() {
  rl.question('Enter your income from last year: ', (income1) => {
    userInput.push(parseInt(income1, 10));

    rl.question('Enter your income from one year ago: ', (income2) => {
      userInput.push(parseInt(income2, 10));

      rl.question('Enter your income from two years ago: ', (income3) => {
        userInput.push(parseInt(income3, 10));

        // Close the readline interface
        rl.close();

        // Check if all three values are integers
        if (userInput.every(Number.isInteger)) {
          // Call the calculateDagpenger function with the user's input
          const result = calculateDagpenger(userInput);
          console.log('Result:', result);
        } else {
          console.error('Invalid input. Please enter three integer values.');
        }
      });
    });
  });
}

getUserInput();
