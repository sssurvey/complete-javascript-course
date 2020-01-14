/**
 * 1. Build a function constructor called question to describe a question.
 * Challenge 1:
 * A question would include:
 *  - Question itself
 *  - All the answer that the user can choose from
 *  - the correct answer
 *  - and create a couple of questions using the constructor
 *  - store all them in an array
 *  - ask the question in random order
 *  - use the prompt function to ask for user input to choose the question
 *  - if the answer is correct then we console log the answer is correct or not
 *  - use the IIFE pattern to be encapsulated
 *  ========================= all above completes ============================
 * Challenge 2:
 *  - after you display the result, display the next random question, so that the
 *    game never ends
 *  - provide a way for user to break away from the loop
 *  - track the user's score to make the game more fun! so each time an answer
 *    is correct, add 1 points to the score
 */

 /**
  * Start of the entire script file level IIFE to encapsulate everything as 
  * required!
  */
 (function () {
/**
 * Create questions instance, Question constructor
 * @param {string} question The Question description
 * @param {[]} answers An array for all the answers to choose from
 * @param {number} correctAnswerIndex The index for correct answer in answers[]
 */
function Question(question, answers, correctAnswerIndex) {
    this.question = question,
    this.answers = answers,
    this.correctAnswerIndex = correctAnswerIndex
}

/**
 * Print the entire question, include question desc, and all the answers, ranked
 * based on their location in the array.
 */
Question.prototype.askTheQuestion = function () {
    console.log(this.question);
    this.answers.forEach((element, index) => {
        console.log(index + " - " + element);
    });
}

/** 
 * Validate the user input and cast it to number, then compare to see if the user
 * has input the correct answer.
 * @param {string} input A user inputed number, use it to match the correct index
 * @return {boolean} If the input number is the correct answer return true
 */
Question.prototype.validateAnswer = function (input) {
    var inputNumber = Number.parseInt(input);
    if (inputNumber === this.correctAnswerIndex) {
        return true;
    } else {
        return false;
    }
}

/**
 * Reads lines by using prompt from user input
 * @return {string} user input
 */
function readFromConsole() {
    return prompt('Based on what you read from the console, select the correct answer');
}

/**
 * Prepares the question array, then present them using the passed in function
 * @param {function} functionRunner 
 * The function runner is a function that specify how the question is going to
 * be asked
 */
function prepareQuestions(functionRunner) {
    var questionArr = [];
    questionArr.push(
        new Question('Do you think programming is?',
            ['Boring', 'Hard', 'Fun', 'Easy'],
            2)
    );
    questionArr.push(
        new Question('Who is the teacher of this programming class?',
            ['Jon', 'Dan', 'Jenny', 'Jonas'],
            3)
    );
    questionArr.push(
        new Question('Is Javascript better then Java?',
            ['Yes', 'No', 'Maybe'],
            2)
    );
    questionArr.push(
        new Question('What programming paradiam does Javascript use?',
            ['Functional programming',
                'Object oriented programming',
                'Both',
                'Free style'],
            2)
    );
    return functionRunner(questionArr);
}

/**
 * Generates a random number between 0 to param
 * @param {number} length 
 */
function generateRandomIndex(length) {
    return Math.floor(Math.random() / length * 10)
}

/**
 * Use the passed in question[] to display all the questions and their answers.
 * It will then use the prompt to ask the user for inputs:
 * - If user inputs 'exit' we will quit displaying random questions
 * - If user inputs incorrect answer index, we will continue display same question
 * - If user inputs the correct answer, we display a random question
 * @param {[]} questionArr An array of all the question instance that we will 
 * display
 */
function functionRunner(questionArr) {

    var totalScore = 0;
    var flag = true;
    var index = generateRandomIndex(questionArr.length - 1);

    while (flag) {

        questionArr[index].askTheQuestion();
        var promptResult = readFromConsole();

        if (promptResult === 'exit') {
            console.log('You total score is: ' + totalScore);
            flag = false;
        } else if (questionArr[index].validateAnswer(promptResult)) {
            console.log("You have choosen the correct ANSWER!");
            totalScore++;
            index = generateRandomIndex(questionArr.length - 1);
        } else {
            // no-op ask the same question
            console.log("You have choosen the wrong ANSWER!");
        }
    }

    console.log('Program exited');
}

/**
 * IIFE Main method
 */
(function () {
    prepareQuestions(functionRunner);
})();

})(); // END of entire iife