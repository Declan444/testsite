/**
 * Parse the HTML Dom elements to be manipulated and assign them to variables
 */
const question = document.getElementById('question');
const answerOptions = document.getElementById('answers');

/**
 *@param {string} Url - The location of the JSON Data to fetch
 *This function fetches the JSON data from the URL provided and initializes the quiz
 */
async function fetchDataAndRender(url) {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    initQuiz(jsonData);
  } catch (err) {
    // If an error occurs we log it to the console
    console.error('Failed to fetch and render data', err);
  }
}

// Call the fetchDataAndRender function with the URL of the JSON data
fetchDataAndRender('static/json/quiz-data.json');

/**
 * @param {Object} JSON - The returned JSON data from the fetchDataAndRender function
 * This function initializes the quiz by setting the first question and its answers
 */
function initQuiz(jsonData) {
  let currQuestion = 0;
  let currAnswer = jsonData[currQuestion].answer;

  // Add an event listener to the answer options to check if the selected answer is correct
  answerOptions.addEventListener('click', (e) => {
    if (e.target && e.target.matches('li')) {
      const dataID = e.target.getAttribute('data-id');
      checkAnswer(dataID, currAnswer);
    }
  });

  /**
   * @param {string} dataID - The id of the selected answer
   * @param {string} currAnswer - The correct answer to the question
   * This function checks if the selected answer is correct
   */
  function checkAnswer(dataID, currAnswer) {
    console.log(dataID, currAnswer);
    if (dataID === currAnswer) {
      console.log(
        `"You selected ${dataID}, the correct answer is ${currAnswer}"`
      );
    } else {
      console.log(
        `"You selected ${dataID}, the correct answer is ${currAnswer}"`
      );
    }
  }

  // Update the DOM with the current question
  question.innerHTML = jsonData[currQuestion].prompt;

  // Update the answer options with the current question's answers
  jsonData[0].choices.forEach((answer) => {
    let answerOption = document.createElement('li');
    answerOption.setAttribute('data-id', answer.id);
    answerOption.innerHTML = answer.content;
    answerOptions.appendChild(answerOption);
  });
}
