
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

/**$.get('https://api.myjson.com/bins/6nif0', function (data, textStatus, jqXHR) {
    myQuestions = JSON.stringify(data);
    $("#data").val(myQuestions);
    console.log(myQuestions);
});*/


var myQuestions = [
    {
        question: "... English people drink Coffee?",
        answers: {
            a: 'Are',
            b: 'Do',
            c: 'Have'
        },
        correctAnswer: 'b'
    },
    {
        question: "Your friend ... good English",
        answers: {
            a: 'speaks',
            b: 'speak',
            c: 'speaking'
        },
        correctAnswer: 'a'
    },
    {
        question: "Where did you ... lunch last Tuesday?",
        answers: {
            a: 'has',
            b: 'have',
            c: 'had'
        },
        correctAnswer: 'b'
    },
    {
        question: "The film wasn´t good and we didn´t enjoy ...",
        answers: {
            a: 'her',
            b: 'him',
            c: 'it'
        },
        correctAnswer: 'c'
    },
    {
        question: "... they go to the cinema yesterday?",
        answers: {
            a: 'Did',
            b: 'Do',
            c: 'Does'
        },
        correctAnswer: 'a'
    },
    {
        question: "We´ve never been ... to America.",
        answers: {
            a: 'to',
            b: 'at',
            c: 'by'
        },
        correctAnswer: 'a'
    },
    {
        question: "There aren´t ... hospitals near our house",
        answers: {
            a: 'a',
            b: 'some',
            c: 'any'
        },
        correctAnswer: 'c'
    },
    {
        question: "I´ve met her ... the bus.",
        answers: {
            a: 'at',
            b: 'on',
            c: 'in'
        },
        correctAnswer: 'b'
    },
    {
        question: "Would you mind ... me some coinf for the phone please?",
        answers: {
            a: 'to give',
            b: 'give',
            c: 'giving'
        },
        correctAnswer: 'c'
    },
    {
        question: "... I were you, I´d go to a good doctor.",
        answers: {
            a: 'When',
            b: 'How',
            c: 'If'
        },
        correctAnswer: 'c'
    }
];




function printquiz() {

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var sendButton = document.getElementById('send');

    generateQuiz(myQuestions, quizContainer, resultsContainer, sendButton);

    function generateQuiz(questions, quizContainer, resultsContainer, sendButton) {

        function showQuestions(questions, quizContainer) {
            // místo pro otázky
            var output = [];
            var answers;


            for (var i = 0; i < questions.length; i++) {
                answers = [];
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
                    '<div class="slide"> ' +
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>' +
                    '<div class="question">' + questions[i++].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>' +
                    '<div class="question">' + questions[i++].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>' +
                    '<div class="question">' + questions[i++].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>' +
                    '<div class="question">' + questions[i++].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>' +
                    '</div> '
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
                } else {
                    //v případě špatné odpovědi na červeno
                    answerContainers[i].style.color = "red";
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
        showQuestions(questions, quizContainer);


        function showSlide(n) {
            slides[currentSlide].classList.remove("active-slide");
            slides[n].classList.add("active-slide");
            currentSlide = n;

            if (currentSlide === 0) {
                previousButton.style.display = "none";
            } else {
                previousButton.style.display = "inline-block";
            }

            if (currentSlide === slides.length - 1) {
                nextButton.style.display = "none";
                sendButton.style.display = "inline-block";
            } else {
                nextButton.style.display = "inline-block";
                sendButton.style.display = "none";
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }

        const previousButton = document.getElementById("previous");
        previousButton.style.display = "block"
        const nextButton = document.getElementById("next");
        nextButton.style.display = "block"
        const slides = document.querySelectorAll(".slide");
        let currentSlide = 0;

        showSlide(0);


        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);

        //fce při kliknutí na tlačítko
        sendButton.onclick = function () {

            showResults(questions, quizContainer, resultsContainer);
            var name = document.getElementById("name").value;
            var age = document.getElementById("age").value;
            var body = name + '\n' + age;

            var infoEmail = 'To: sarka.placha@email.cz\r\nSubject: Nový uživatelz\r\n\r\n' + body;

            const sendRequest = gapi.client.gmail.users.messages.send({
                'userId': 'me',
                'resource': {
                    'raw': btoa(unescape(encodeURIComponent(infoEmail))).replace(/\+/g, '-').replace(/\//g, '_')
                }
            });

        }
    }
}
