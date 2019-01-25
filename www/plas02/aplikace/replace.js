

var myQuestions = [
    {
        question: "English people drink Coffee?",
        answers: {
            a: 'Are',
            b: 'Do',
            c: 'Have'
        },
        correctAnswer: 'b'
    },
];

var selectedAnswer;
function change() {
    selectedAnswer = document.getElementById("myOptions").options[document.getElementById('myOptions').selectedIndex].text;
    selectedAnswer += " ";
    console.log(selectedAnswer);
    document.getElementById("whatMustChange").innerHTML = selectedAnswer;

}

printquiz();
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
                        "<option value=" + letter + " id =" + questions[i].answers[letter] + " > " + questions[i].answers[letter] + "</option > "
                    );

                }

                // přidání naší otázky s odpovědmi do pole output
                output.push(
                    '<div class="question">' + '<span id="whatMustChange" style="color:black">...</span>' + questions[i].question + '</div>'
                    + '<div class="answers">' + '<select id=myOptions onchange= "change()" >' + answers.join('') + '</select>' + '</div>'
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
            var output = [];
            var answers = [];

            for (var i = 0; i < questions.length; i++) {

                // nalezení konkretní otázky a odpovědi

                userAnswer = document.getElementById('myOptions').value;


                // co se stane v případě správné odpovědi - načtou se body a změní barva
                if (userAnswer === questions[i].correctAnswer) {
                    points++;
                    document.getElementById("whatMustChange").style.color = "green";
                } else {
                    //v případě špatné odpovědi na červeno
                    document.getElementById("whatMustChange").style.color = "red";
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


        sendButton.style.display = "block";

        //fce při kliknutí na tlačítko
        sendButton.onclick = function () {

            showResults(questions, quizContainer, resultsContainer);



        }
    }
}