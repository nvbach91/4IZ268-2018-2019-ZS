
var CLIENT_ID = '581875226236-rthd0p3vt1a2r6sln82gans4j60e2cqc.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDPAK042knhPYBFrvpjEoFaBrtZu-vL-mk';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// volání načtení auth2 library a API client library.
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

//Inicializuje API client library a nastaví sign-in stav
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

//Když se změní status, aplikace ke změně tlačítek a volání fce printquiz
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        printquiz();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}


function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

var myQuestions;

$.getJSON('https://api.myjson.com/bins/1ag618').done(function (response) {
    console.log(response);
    myQuestions = response;
});

function printquiz() {

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var sendButton = document.getElementById('send');

    generateQuiz(myQuestions, quizContainer, resultsContainer, sendButton);

    function generateQuiz(questions, quizContainer, resultsContainer, sendButton) {

        function showQuestions(questions, quizContainer) {
            // místo pro otázky
            var output = [];
            var answers = [];


            for (var i = 0; i < questions.length; i++) {


                for (letter in questions[i].answers) {

                    // přidání možnosti výběru před odpovědi
                    answers.push(
                        '<label>'
                        + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                        + letter + ': '
                        + questions[i].answers[letter]
                        + '</label>'
                    );
                }

                // přidání naší otázky s odpovědmi do pole output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join('')
                );

            }

            //uprava našich otázek na html string a přidání na stránku
            quizContainer.innerHTML = output.join('');
        }

        function showResults(questions, quizContainer, resultsContainer) {

            var answerContainers = quizContainer.querySelectorAll('.answers');

            // proměné pro ukládání skóre
            var userAnswer = '';
            var points = 0;

            for (var i = 0; i < questions.length; i++) {

                // nalezení konkretní otázky a odpovědi
                userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;



                // co se stane v případě správné odpovědi - načtou se body a změní barva
                if (userAnswer === questions[i].correctAnswer) {
                    points++;
                    answerContainers[i].style.color = "green";
                    var fillQuestion = questions[i].question.replace("...", userAnswer);
                    questions[i].question = fillQuestion;
                    output.push(
                        '<div class="slide"> ' +
                        '<div class="question">' + fillQuestion + '</div>');
                } else {
                    //v případě špatné odpovědi na červeno
                    answerContainers[i].style.color = "red";
                    var fillQuestion = questions[i].question.replace("...", userAnswer);
                    questions[i].question = fillQuestion;
                }

            }

            //definice proměné vysledek, která bude definovat úroveň aj uživatele
            var vysledek;
            if (points <= 2) {
                vysledek = "začátečník";
            }
            if (points > 2 && points <= 6) {
                vysledek = "mírně pokročilý";
            }
            if (points > 6) {
                vysledek = "pokročilý";
            }

            //vytisknutí výsledku
            resultsContainer.innerHTML = 'Správně: ' + points + ". Tvoje úroveň angličtiny je " + vysledek + ".";
        }
        //pro zorbrazní otázek s odpovědmi
        // showQuestions(questions, quizContainer);


        var startSlide;

        function generateSlides() {
            var numberOfQuestionsPerSlide = 5;
            var numberOfSlides = Math.ceil(myQuestions.length / numberOfQuestionsPerSlide);
            var output = '';
            for (var i = 0; i < numberOfSlides; i++) {
                startSlide = i * numberOfQuestionsPerSlide;
                var nextSlide = startSlide++;
                var endSlide = startSlide + numberOfQuestionsPerSlide;
                output += '<div class="slide">';
                var questionsToGenerate = myQuestions.slice(startSlide, endSlide);
                output += showQuestions(questionsToGenerate, quizContainer);
                output += '</div>';
            }
            return output;
        };

        var slidesHtml = generateSlides();
        generateSlides();


        var previousButton = document.getElementById("previous");
        previousButton.style.display = "block"
        var nextButton = document.getElementById("next");
        nextButton.style.display = "block"



        if (startSlide) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (startSlide === slides.length - 1) {
            nextButton.style.display = "none";
            sendButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            sendButton.style.display = "none";
        }
    }

    function showNextSlide() {
        generateSlides(nextSlide);
        nextSlide++;
    }

    function showPreviousSlide() {
        generateSlides(nextSlide--);
        nextSlide--;
    }

    const slides = document.querySelectorAll(".slide");

    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide); x



    //fce při kliknutí na tlačítko
    sendButton.onclick = function () {

        showResults(questions, quizContainer, resultsContainer);
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var body = name + '\n' + age;

        var infoEmail = 'To: sarka.placha@email.cz\r\nSubject: Nový uživatel\r\n\r\n' + body;

        const sendRequest = gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': {
                'raw': btoa(unescape(encodeURIComponent(infoEmail))).replace(/\+/g, '-').replace(/\//g, '_')
            }
        });

    }
}
