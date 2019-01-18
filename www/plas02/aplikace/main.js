var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var sendButton = document.getElementById('send');
var email = document.getElementById("email").value;


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
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
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

    //fce při kliknutí na tlačítko
    sendButton.onclick = function () {

        showResults(questions, quizContainer, resultsContainer);

        //definování vlastní client ID a API
        var clientId = '581875226236-hhedtikokbr5ngbj4ud3r8g9f90nv4ho.apps.googleusercontent.com';
        var apiKey = 'AIzaSyC-sI_Sq4BkTJxVh6GtpgyVh_LrHekt28c';

        //nutné scopes, možná by šlo i bez labels a modify
        var scopes = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.labels'];


        function handleClientLoad() {
            gapi.client.setApiKey(apiKey);
            window.setTimeout(checkAuth, 1);
        }

        function checkAuth() {
            gapi.auth.authorize({
                client_id: clientId,
                scope: scopes,
                immediate: true
            }, handleAuthResult);
        }

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                loadGmailApi();
            }
        }

        function loadGmailApi() {
            gapi.client.load('gmail', 'v1', function () {
                console.log("Loaded GMail API");
            });
        }


        //fce na odeslání emailu s načtením příjemce z formuláře
        sendEmail = function () {
            var content = 'Správně: ';
            var sender = 'salulinka@gmail.com';
            var receiver = 'sarka.placha@email.cz';
            var to = 'To: ' + receiver;
            var from = 'From: ' + sender;
            var subject = 'Subject: ' + 'Vysledky testu';
            var contentType = 'Content-Type: text/plain; charset=utf-8';
            var mime = 'MIME-Version: 1.0';

            var message = "";
            message += to + "\r\n";
            message += from + "\r\n";
            message += subject + "\r\n";
            message += contentType + "\r\n";
            message += mime + "\r\n";
            message += "\r\n" + content;

            sendMessage(message, receiver, sender);
            console.log("sendEmail");
        }();

        function sendMessage(message, receiver, sender) {
            var headers = getClientRequestHeaders();
            var path = "http://wwww.gmail/v1/users/me/messages/send?key=" + clientId;
            console.log("sendMessage_middle");
            gapi.client.request({
                path: path,
                method: "POST",
                headers: headers,
                body: {
                    'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
                }
            }).then(function (response) {

            });
            console.log("sendMessage");
        }


        var t = ' ';
        function getClientRequestHeaders() {
            if (!t) t = gapi.auth.getToken();
            gapi.auth.setToken({ token: ['access_token'] });
            var a = "Bearer " + ["access_token"];
            return {
                "Authorization": a,
                "X-JavaScript-User-Agent": "Google APIs Explorer"
            };

        }
        console.log("odeslání zprávy");
    }
}
