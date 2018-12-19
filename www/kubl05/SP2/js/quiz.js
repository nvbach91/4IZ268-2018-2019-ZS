const quizContainer = document.querySelector("#quiz");
const resultsContainer = document.querySelector("#results");
const newButton = document.querySelector("#new");
const submitButton = document.querySelector("#submit");
const shareButton = document.querySelector("#share");
var alertWindow = document.querySelector(".alert-window");
var closeWindow = document.querySelectorAll(".close")[0];
var message = document.querySelector(".alert-window-text");
var listOfQuestions = [];

var buildQuiz = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.myjson.com/bins/10e4gw");
  xhr.addEventListener("load", function() {
    var data = JSON.parse(xhr.responseText);

    listOfQuestions = data;
    resultsContainer.innerHTML = "";
    var output = [];
    quizContainer.innerHTML = '<img src="img/loader.svg">';

    listOfQuestions.forEach((currentQuestion, questionNumber) => {
      var answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
              <input type="checkbox" name="question${questionNumber}" class="disableMe" value="${letter}">
              ${currentQuestion.answers[letter]}
            </label>`
        );
      }

      answers.sort(function() {
        return 0.5 - Math.random();
      });

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  });
  xhr.send();
  $("html, body").animate({ scrollTop: 0 }, "slow");
};

var getResults = function() {
  if (resultsContainer.innerHTML) {
    return false;
  }

  var answerContainers = quizContainer.querySelectorAll(".answers");
  nCorrect = 0;

  listOfQuestions.forEach((currentQuestion, questionNumber) => {
    var answerContainer = answerContainers[questionNumber];
    var zk = [];
    $(`input[name=question${questionNumber}]:checked`).each(function() {
      zk.push($(this).val());
    });

    zk.sort();
    if (zk.toString() === currentQuestion.correctAnswer.toString()) {
      nCorrect++;
      answerContainer.style.color = "lightgreen";
    } else {
      answerContainer.style.color = "red";
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
  $(".disableMe").prop("disabled", true);
};

var share = function() {
  if (!resultsContainer.innerHTML) {
    return false;
  }

  var url = "https://twitter.com/intent/tweet";
  var text = $("#results").text();
  var via = "lukazko";
  url = url + "?text=" + text + ";via=" + via;

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
