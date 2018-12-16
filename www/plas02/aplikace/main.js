var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('send');
var adress = document.getElementById("email-input").value;

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

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        var output = [];
        var answers;

        for (var i = 0; i < questions.length; i++) {


            answers = [];
            for (letter in questions[i].answers) {

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {


        var answerContainers = quizContainer.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;


        for (var i = 0; i < questions.length; i++) {
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
            if (userAnswer === questions[i].correctAnswer) {
                numCorrect++;
            }

        }

        resultsContainer.innerHTML = 'Správně: ' + numCorrect;
    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
    }
}

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);