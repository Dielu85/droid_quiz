// Game State
let currentMode = 'easy'; // 'easy' or 'hard'
let currentQuestion = 0;
let score = 0;
let gameQuestions = [];

// Easy Mode Questions (Identify Droid Type)
const easyQuestions = [
  {
    image: "./droides/B1_ingeniero_Frontal_1.png",
    options: ["B1 Ingeniero", "B1 Seguridad", "B1 Piloto", "B1 Marine"],
    answer: 0
  },
  {
    image: "./droides/B1_Tanquista_Frontal_1.png",
    options: ["B1 Piloto", "B1 Marine", "B1 Tanquista", "B1 Seguridad"],
    answer: 2
  },
  {
    image: "./droides/B1_Marine_Frontal_1.png",
    options: ["B1 Ingeniero", "B1 Seguridad", "B1 Piloto", "B1 Marine"],
    answer: 3
  },
  {
    image: "./droides/B1_Sec_Frontal_1.png",
    options: ["B1 Piloto", "B1 Seguridad", "B1 Marine", "B1 Tanquista"],
    answer: 1
  },
  {
    image: "./droides/B1_piloto_Frontal_1.png",
    options: ["B1 Piloto", "B1 Marine", "B1 Tanquista", "B1 Ingeniero"],
    answer: 0
  },
  {
    image: "./droides/Magnaguardias_1.png",
    options: ["Super Droide de Batalla B2", "Magnaguardia", "Comando BX", "Droide Táctico"],
    answer: 1
  },
  {
    image: "./droides/Tacticos_1.png",
    options: ["Droide Táctico", "Comandante B1", "Droide Comando OOM", "Piloto B2"],
    answer: 0
  }
];

// Hard Mode Data (Rank Identification)
const hardModeData = [
  // SDO (Private)
  { image: "./droides/ranks/SDO/B1_Marine_Frontal_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_Sec_Frontal_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_Sec_Frontal_XO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_Snow.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_Tanquista_Frontal_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_ingeniero_Frontal_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_piloto_Frontal_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_piloto_Frontal_XO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B1_rocket.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B2_SDO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B2_Snow.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/B2_XO.png", rank: "SDO" },
  { image: "./droides/ranks/SDO/Bx_SDO.png", rank: "SDO" },

  // SGT (Sergeant)
  { image: "./droides/ranks/SGT/B1_Marine_Frontal_SGT.png", rank: "SGT" },
  { image: "./droides/ranks/SGT/B1_Sec_Frontal_SGT.png", rank: "SGT" },
  { image: "./droides/ranks/SGT/B1_Tanquista_Frontal_SGT.png", rank: "SGT" },
  { image: "./droides/ranks/SGT/B1_ingeniero_Frontal_SGT.png", rank: "SGT" },
  { image: "./droides/ranks/SGT/B1_piloto_Frontal_SGT.png", rank: "SGT" },

  // TTE (Lieutenant)
  { image: "./droides/ranks/TTE/B1_Sec_Frontal_TTE.png", rank: "TTE" },
  { image: "./droides/ranks/TTE/B1_ingeniero_Frontal_TTE.png", rank: "TTE" },
  { image: "./droides/ranks/TTE/B1_piloto_Frontal_TTE.png", rank: "TTE" },

  // CMD (Commander)
  { image: "./droides/ranks/CMD/B1_Marine_Frontal_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/B1_Sec_Frontal_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/B1_Tanquista_Frontal_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/B1_ingeniero_Frontal_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/B1_piloto_Frontal_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/B2_CMD.png", rank: "CMD" },
  { image: "./droides/ranks/CMD/Tactico_Negro.png", rank: "CMD" },

  // CPT (Captain)
  { image: "./droides/ranks/CPT/Bx_CPT.png", rank: "CPT" }
];

const allRanks = ["SDO", "SGT", "TTE", "CMD", "CPT", "General"];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  showLevelSelection();
});

function showLevelSelection() {
  const container = document.querySelector(".transbox");
  container.innerHTML = `
    <h1>SELECCIONAR DIFICULTAD</h1>
    <div class="level-select">
      <button onclick="startGame('easy')">FÁCIL<br><span style="font-size:0.8em">Identificar Unidad</span></button>
      <button onclick="startGame('hard')">DIFÍCIL<br><span style="font-size:0.8em">Identificar Rango</span></button>
    </div>
  `;
}

function startGame(mode) {
  currentMode = mode;
  score = 0;
  currentQuestion = 0;

  if (mode === 'easy') {
    gameQuestions = [...easyQuestions];
  } else {
    gameQuestions = generateHardQuestions();
  }

  // Restore Game UI
  const container = document.querySelector(".transbox");
  container.innerHTML = `
    <h1>Identificación de Unidad CIS</h1>
    <div class="game-container">
      <div class="image-container">
        <img id="questionImage" src="" alt="Droid for identification">
      </div>
      
      <div class="options">
        <button onclick="checkAnswer(0)"></button>
        <button onclick="checkAnswer(1)"></button>
        <button onclick="checkAnswer(2)"></button>
        <button onclick="checkAnswer(3)"></button>
      </div>

      <div id="feedback" class="feedback"></div>
      
      <div class="stats">
        <p>Puntaje: <span id="score">0</span></p>
        <p id="question-counter">Iniciando...</p>
      </div>

      <div class="controls">
        <button class="btn-control" onclick="resetGame()">REINICIAR</button>
        <button class="btn-control" onclick="exitGame()">SALIR</button>
      </div>
    </div>
  `;

  loadQuestion();
}

function generateHardQuestions() {
  const questions = [];

  hardModeData.forEach(item => {
    // Standard Rank Question
    // Generate 4 options including the correct one
    const options = generateOptions(item.rank);

    questions.push({
      image: item.image,
      options: options,
      answer: options.indexOf(item.rank),
      type: 'rank'
    });
  });

  // Shuffle questions
  return questions.sort(() => Math.random() - 0.5);
}

function generateOptions(correctRank) {
  // Always include the correct rank
  const options = [correctRank];

  // Filter out the correct rank from the pool
  const distractors = allRanks.filter(r => r !== correctRank);

  // Shuffle distractors and pick 3
  distractors.sort(() => Math.random() - 0.5);
  options.push(...distractors.slice(0, 3));

  // Shuffle the final options
  return options.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = gameQuestions[currentQuestion];
  const img = document.getElementById("questionImage");
  img.src = q.image;

  // Reset styles
  img.className = '';
  img.style.objectPosition = '';
  img.style.width = '100%';

  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.className = '';
    btn.disabled = false;
    btn.style.display = 'block';
  });

  // Hide unused buttons if options < 4
  for (let i = q.options.length; i < 4; i++) {
    buttons[i].style.display = 'none';
  }

  const feedbackEl = document.getElementById("feedback");
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  document.getElementById("question-counter").textContent = `Pregunta ${currentQuestion + 1} / ${gameQuestions.length}`;
}

function checkAnswer(choice) {
  const q = gameQuestions[currentQuestion];
  const feedbackEl = document.getElementById("feedback");
  const buttons = document.querySelectorAll(".options button");

  buttons.forEach(btn => btn.disabled = true);

  let isCorrect = (choice === q.answer);

  if (isCorrect) {
    score++;
    feedbackEl.textContent = "CORRECTO";
    feedbackEl.classList.add("correct");
    buttons[choice].classList.add("btn-correct");
  } else {
    feedbackEl.textContent = "INCORRECTO";
    feedbackEl.classList.add("wrong");
    buttons[choice].classList.add("btn-wrong");

    // Show correct answer
    buttons[q.answer].classList.add("btn-correct");
  }

  document.getElementById("score").textContent = score;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < gameQuestions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 1500);
}

function endGame() {
  const container = document.querySelector(".transbox");
  container.innerHTML = `
    <h1>SIMULACIÓN COMPLETADA</h1>
    <div class="final-score">
      <p>Puntaje Final: ${score} / ${gameQuestions.length}</p>
      <p>${getRank(score)}</p>
    </div>
    <button id="restartBtn" onclick="showLevelSelection()">VOLVER AL MENÚ</button>
  `;
}

function getRank(score) {
  const percentage = score / gameQuestions.length;
  if (percentage === 1) return "Rango: COMANDANTE SUPREMO";
  if (percentage >= 0.8) return "Rango: DROIDE TÁCTICO";
  if (percentage >= 0.5) return "Rango: COMANDANTE B1";
  return "Rango: CHATARRA";
}

function resetGame() {
  startGame(currentMode);
}

function exitGame() {
  showLevelSelection();
}
