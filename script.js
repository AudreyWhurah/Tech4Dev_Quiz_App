/* The provided JavaScript code is part of a quiz application named "Tech_4_Dev Quiz App." Below is an explanation of the code sections:
*/
//below are the Quiz data
const quizData = [
    {
      question: 'How many bits make a byte?',
      options: ['22 bits' ,'16 bits','8 bits','12 bits'],
      answer:  '8 bits',
  },
    {
      question: 'The first search engine on the internet is ?',
      options: ['Archie', 'Google', 'Bing', 'Yahoo'],
      answer: 'Archie',
    },
    {
      question: 'The number of bits used by IPv6 address is ?',
      options: ['16', '24', '64', '128'],
      answer: '128',
    },
    {
      question: 'Which technology is used to record cryptocurrency transactions?',
      options: ['Mining', 'Digital Wallet', 'Token', 'BlockChain Technology'],
      answer: 'BlockChain Technology',
    },
    {
      question: 'One of the advantages of information technology is?',
      options: [
        'Streamline Communication',
        'Easy to Handle',
        'Both A and B',
        'None',
      ],
      answer: 'Streamline Communication',
    },
    {
      question: 'The first computer virus was known as ?',
      options: ['Rabbit', 'ELK Cloner', 'SCA Virus ', 'Creeper Program'],
      answer: 'Creeper Program',
    },
    {
      question: 'What does A.I. stand for?',
      options: [
        'Artificial Intelligence',
        'Artificial Information',
        'Anti intelligence',
        'Anti Information',
      ],
      answer: 'Artificial Intelligence',
    },
    {
      question: 'What does SMS stand for??',
      options: ['Short Meter Service', 'Share More Stories', 'Secure Messages Service', 'Short Message Service'],
      answer: 'Short Message Service',
    },
    {
      question: 'What is the full form of (CPU)?',
      options: [
        'Central Processing Unit',
        'Crucial Processing Unit',
        'Critical Processing Unit',
        'Central Printing Unit',
      ],
      answer: 'Central Processing Unit',
    },
    {
      question: 'The process of starting or restarting a computer is called:?',
      options: ['Startup Point', 'Booting', 'Connecting', 'Resetting'],
      answer: 'Booting',
    },
  ];
  
  //Below shows the element references, These lines fetch references to HTML elements by their IDs. These elements are used to dynamically update the content of the quiz and display results.
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
 
  //These variables below keep track of the current question number, the user's score, and a collection of incorrectly answered questions.
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];


  // Function to shuffle the order of options in each question
  // Uses the Fisher-Yates algorithm
  // Example: shuffleArray([1, 2, 3, 4]) => [3, 1, 4, 2]
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Function to display the current question and its options
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);

      // Function to highlight correct and incorrect options after user selection
      radio.addEventListener('change', function () {
        highlightOptions(questionData.answer, radio);
      });
    }
    
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function highlightOptions(answer, ratdio) {
       const options = document.querySelectorAll('input[name="quiz"]');
      options.forEach(option => {
        const optionLabel = option.parentElement;
        console.log(optionLabel);
        option.disabled = true;
        if (option.value === answer) {
            optionLabel.classList.add('correct');
        }else{
            optionLabel.classList.add('incorrect')
        }
      });
  }
  
  // Function to check the user's selected answer, update score, and proceed to the next question
  function checkAnswer() {
    console.log("here");
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }


      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  // Function to display the final result after completing the quiz
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  // Function to display correct and incorrect answers after completing the quiz
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  //These lines add event listeners to buttons, triggering specific functions when the buttons are clicked.
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  displayQuestion();

  // Code for a countdown timer, This section handles the countdown timer functionality, displaying the time remaining for the quiz.

//The code combines these elements to create an interactive quiz application with score tracking, result display, and a countdown timer. Make sure to include associated HTML and CSS files for a complete functioning quiz app
var now = new Date()
now.setMinutes(now.getMinutes()+ 10)
const date = now.getTime()

var x = setInterval(function() {

var countDownDate = new Date().getTime();

var distance = date - countDownDate ;
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";


if (distance < 0) {

clearInterval(x);

document.getElementById("countdown").innerHTML = "EXPIRED";

}

}, 1000);

