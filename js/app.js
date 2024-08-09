const numberInput = document.getElementById('numberInput');
const rangeInput = document.getElementById('rangeInput');
const toggle = document.getElementById('mode-toggle');
const calculateButton = document.getElementById('calculateButton');
const resetButton = document.getElementById('resetButton');
const resultValue = document.getElementById('resultValue');
const calcStatus = document.getElementById('calc-status');
const toggleLabel = document.querySelector('.toggle__label');

// Track extra calculation state
let extraCalc = false;


// Synchronize number input and range input
numberInput.addEventListener('input', () => {
  let value = parseInt(numberInput.value);
  if (value < 0) {
    numberInput.value = 0;
  } else if (value > 99) {
    numberInput.value = 99;
  }
  rangeInput.value = numberInput.value;
});

rangeInput.addEventListener('input', () => {
  numberInput.value = rangeInput.value;
});

// Toggle extra calculation on checkbox change
toggle.addEventListener('change', function() {
  extraCalc = this.checked;
  calcStatus.textContent = this.checked ? 'On' : 'Off';
  toggleLabel.style.backgroundColor = this.checked ? 'var(--toggle-on)' : '';
  console.log(extraCalc)

});

// Disable calculate button initially
calculateButton.classList.add('disabled');

// Enable calculate button only when all questions are answered
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const allAnswered = document.querySelectorAll('input[type="radio"]:checked').length === 3;
    if (allAnswered) {
      calculateButton.classList.remove('disabled');
    } else {
      calculateButton.classList.add('disabled');
    }
  });
});

// Highlight correct and incorrect answers after calculation
function highlightAnswers() {
  const correctAnswers = {
    question1: '10', // Paris
    question2: '10', // Mars
    question3: '10'  // Oxygen
  };

  for (let question in correctAnswers) {
    const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
    const labels = document.querySelectorAll(`input[name="${question}"] ~ label`);

    labels.forEach(label => {
      label.classList.remove('correct-answer', 'wrong-answer');
    });

    if (selectedAnswer) {
      const selectedLabel = selectedAnswer.parentElement;
      if (selectedAnswer.value === correctAnswers[question]) {
        selectedLabel.classList.add('correct-answer');
      } else {
        selectedLabel.classList.add('wrong-answer');
      }
    }
  }
}

// Calculate the result
calculateButton.addEventListener('click', () => {
  let result = 0;

  // Get the values from the questions
  const question1Value = document.querySelector('input[name="question1"]:checked');
  const question2Value = document.querySelector('input[name="question2"]:checked');
  const question3Value = document.querySelector('input[name="question3"]:checked');

  if (question1Value) {
    result += parseInt(question1Value.value);
  }

  if (question2Value) {
    result += parseInt(question2Value.value);
  }

  if (question3Value) {
    result += parseInt(question3Value.value);
  }

  // Get the value from the slider/input
  result += parseInt(numberInput.value);

  // Apply extra calculation if toggled
  if (extraCalc) {
    result *= 2;
  }

  // Display the result
  resultValue.textContent = result;

  // Highlight correct and incorrect answers
  highlightAnswers();
});


// Reset all inputs to default values
resetButton.addEventListener('click', () => {
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.checked = false;
    radio.disabled = false;  // Re-enable the radio buttons
    radio.parentElement.classList.remove('correct-answer', 'wrong-answer');
  });
  numberInput.value = 0;
  rangeInput.value = 0;
  extraCalc = false;
  toggle.checked = false;
  calcStatus.textContent = 'Off';
  toggleLabel.style.backgroundColor = '';
  resultValue.textContent = 0;
  calculateButton.classList.add('disabled');
});


