const quizContainer = document.querySelector("#quiz");
const resultsContainer = document.querySelector("#results");
const newButton = document.querySelector("#new");
const submitButton = document.querySelector("#submit");
const shareButton = document.querySelector("#share");
var alertWindow = document.querySelector(".alert-window");
var closeWindow = document.querySelectorAll(".close")[0];
var message = document.querySelector(".alert-window-text");

var listOfQuestions = [
  {
    question: "Ahoj, vítej v mém kvízu, nebudeme otálet a jdeme rovnou na věc!",
    answers: {
      a: "Ahoj!",
      b: "Tvoje máma je kvíz!",
      c: "Život je life",
      d: "4IZ268"
    },
    correctAnswer: "c"
  },
  {
    question: "Jaký je tvůj nejoblíbenější kousek z merche The Boring Company?",
    answers: {
      a: "Flamethrower",
      b: "Kšiltovka",
      c: "not a Flamethrower"
    },
    correctAnswer: "c"
  },
  {
    question:
      "Petr nikdy nemluví pravdu. Zuzana vždycky lže. Zuzana tvrdí, že Petr na sobě má zelený svetr. Petr říká, že tomu tak není. Kolik štěňat má Standa?",
    answers: {
      a: "Nevím :(",
      b: "3",
      c: "Standa má surikatu",
      d: "Panu Jiřímu smrdí nohy"
    },
    correctAnswer: "d"
  },
  {
    question: "Který z Finwëho synů je tvůj nejoblíbenější?",
    answers: {
      a: "Fëanor",
      b: "Fingolfin",
      c: "Finarfin",
      d: "Galadriel"
    },
    correctAnswer: "a"
  },
  {
    question: "Myslíš si, že je Schrödingerova kočka naživu?",
    answers: {
      a: "Ano",
      b: "Ne",
      c: "Kvantová mechanika nefunguje v makrosvětě :(",
      d: "Penny je blbá blondýna"
    },
    correctAnswer: "c"
  },
  {
    question: "Jaké je jméno boha?",
    answers: {
      a: "Alláh",
      b: "Nietzsche",
      c: "Škromach",
      d: "Jehova"
    },
    correctAnswer: "b"
  },
  {
    question: "Který z Avengerů je nejmocnější?",
    answers: {
      a: "Thor",
      b: "Hawkeye",
      c: "Božan Drtitel",
      d: "Ta holka z HIMYM"
    },
    correctAnswer: "b"
  },
  {
    question: "Kde se nachází takzvaný ráj surferov?",
    answers: {
      a: "Austrálie",
      b: "Na měsíci Europa",
      c: "Na Bali",
      d: "Oravská priehrada"
    },
    correctAnswer: "d"
  },
  {
    question: "S kterou další postavou z Ulice přišel Matěj Jordán o panictví?",
    answers: {
      a: "S vnučkou pana Peška",
      b: "S paní Niklovou z večerky",
      c: "S Bedřichem Liškou, nebezpečným trestancem",
      d: "Se ségrou Terezou"
    },
    correctAnswer: "a"
  },
  {
    question:
      "Tak jsme na konci. Čeká tě už jen poslední zapeklitá otázka. Líbil se ti tento kvíz?",
    answers: {
      a: "13",
      b: "21",
      c: "42",
      d: "759"
    },
    correctAnswer: "c"
  }
];

var buildQuiz = function() {
  resultsContainer.innerHTML = "";
  var output = [];

  listOfQuestions.forEach((currentQuestion, questionNumber) => {
    var answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
              <input type="radio" id="question${questionNumber}" name="question${questionNumber}" class="disableMe" value="${letter}">
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
};

var getResults = function() {
  if (resultsContainer.innerHTML) {
    return false;
  }

  var answerContainers = quizContainer.querySelectorAll(".answers");
  var nCorrect = 0;

  listOfQuestions.forEach((currentQuestion, questionNumber) => {
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[id=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      nCorrect++;
      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  if (nCorrect >= 5) {
    message.innerHTML =
      "<h2>Dobrá práce!</h2><br> Tvůj výsledek je: <strong>" +
      nCorrect +
      " správných odpovědí z " +
      listOfQuestions.length +
      "</strong>";
    alertWindow.style.display = "block";
  } else {
    message.innerHTML =
      "<h2>Nic moc kámo...</h2><br> Tvůj výsledek je: <strong>" +
      nCorrect +
      " správných odpovědí z " +
      listOfQuestions.length +
      "</strong>";
    alertWindow.style.display = "block";
  }

  resultsContainer.innerHTML =
    "Tvůj výsledek je: <strong>" +
    nCorrect +
    " správných odpovědí z " +
    listOfQuestions.length +
    "</strong>";
  disableInputs();
};

var disableInputs = function() {
  var radios = document.querySelectorAll(".disableMe");

  for (var i = 0; i < radios.length; i++) {
    radios[i].disabled = true;
  }
};

var share = function() {
  if (!resultsContainer.innerHTML) {
    return false;
  }

  var url = "https://twitter.com/intent/tweet";
  var text = $("#results").text();
  var via = "lukazko";
  var hashtag = "lukazko_quiz";
  url = url + "?text=" + text + ";hashtags=" + hashtag + ";via=" + via;

  window.open(url, "Sdílet výsledek na Twitter", "width=650,height=250");
};

closeWindow.onclick = function() {
  alertWindow.style.display = "none";
  message.innerHTML = "";
};

buildQuiz();
submitButton.addEventListener("click", getResults);
newButton.addEventListener("click", buildQuiz);
shareButton.addEventListener("click", share);
