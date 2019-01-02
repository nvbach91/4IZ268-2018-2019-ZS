var gameField = $('#game-field');
var playerOnTurnDiv = $('#playerOnTurn');
var turnDiv = $('#turnDiv');
var gameOver = false;
var playerOnTurn = 1;

var createRow = function () {
    var row = document.createElement('div');
    row.classList.add('row');
    return row;
};

var createCell = function () {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    return cell;
}

function createArray(length) {
    var arr = new Array(length);

    for (var i = 0; i < length; i++) {
        arr[i] = new Array(length);

        for (var j = 0; j < length; j++) {
            arr[i][j] = null;
        }
    }
    return arr;
}

// input lenght of win
var winLength = function () {
    var winLength = parseInt($('#winLength').val());

    if (Number.isNaN(winLength)) {
        return null;
    }

    return winLength;
}
// input size of row
var sizeOfRow = function () {
    var sizeOfRow = parseInt($('#sizeOfRow').val());

    if (Number.isNaN(sizeOfRow)) {
        return null;
    }

    return sizeOfRow;
};

var size = 5;
var winSize = 3;

var gameArr = createArray(size);
var freeCellsCount = size * size;

var isWinner = function (gameArr, player) {
    for (var rowIndex = 0; rowIndex < size; rowIndex++) {
        for (var columnIndex = 0; columnIndex < size; columnIndex++) {
            var correctCount = 0;
            //right
            if (columnIndex + winSize <= size) {
                for (var i = columnIndex; i < columnIndex + winSize; i++) {
                    if (gameArr[rowIndex][i] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }

            //down
            if (rowIndex + winSize <= size) {
                correctCount = 0;
                for (var i = rowIndex; i < rowIndex + winSize; i++) {
                    if (gameArr[i][columnIndex] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }

            //diagonally right-down
            if (rowIndex + winSize <= size && columnIndex + winSize <= size) {
                correctCount = 0;
                for (var i = rowIndex, j = columnIndex; i < rowIndex + winSize; i++ , j++) {
                    if (gameArr[i][j] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }

            //diagonally right-up
            if (rowIndex - winSize >= 0 && columnIndex + winSize <= size) {
                correctCount = 0;
                for (var i = rowIndex, j = columnIndex; i > rowIndex - winSize; i-- , j++) {
                    if (gameArr[i][j] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }
        }
    }

    return false;

};

var playerSymbol = function (player) {
    if (player === 1) {
        return "X";
    }
    if (player === 2) {
        return "O";
    }

    return null;
}

var updatePlayerOnTurnDiv = function (playerOnTurn) {
    var symbol = playerSymbol(playerOnTurn);
    playerOnTurnDiv.text(symbol);
};

// create game field
var startGame = function () {
    var controlSize = sizeOfRow();
    var controlWinSize = winLength();

    if (controlSize === null || controlWinSize === null) {
        alert("Je potřeba vyplnit všechna pole");
        return;
    }

    if (controlWinSize > controlSize) {
        alert("Velikost délky výherní kombinace nemůže být větší než velikost herního pole.");
        return;
    }

    if (controlSize < 3 || controlSize > 15) {
        alert("Velikost herního pole musí být v rozmezí 3 a 15 políček.");
        return;
    }
    size = controlSize;

    if (controlWinSize < 3 || controlWinSize > 5) {
        alert("Délka výherni kombinace musí být minimálně 3 a maximálně 5 políček.");
        return;
    }
    winSize = controlWinSize;

    gameArr = createArray(size);
    freeCellsCount = size * size;
    gameOver = false;
    playerOnTurn = 1;
    gameField.empty();
    updatePlayerOnTurnDiv(playerOnTurn);
    turnDiv.css('visibility', 'visible');
    $('#publishResult').css('visibility', 'hidden');
    $('.cell').removeClass("disabled");

    for (var i = 0; i < size; i++) {
        var row = createRow();
        for (var j = 0; j < size; j++) {
            var cell = createCell();

            // function invoked on user click
            cell.addEventListener('click', function () {
                if (gameOver) {
                    return;
                }

                var columnIndex = $(this).index();
                var rowIndex = $(this.parentNode).index();

                // error checking
                if (gameArr[rowIndex][columnIndex] !== null) {
                    return;
                }

                var previousPlayerOnTurn = playerOnTurn;
                gameArr[rowIndex][columnIndex] = playerOnTurn;
                this.innerText = playerSymbol(playerOnTurn);
                if (playerOnTurn === 1) {
                    this.classList.add("red");
                    playerOnTurn = 2;
                } else {
                    this.classList.add("blue");
                    playerOnTurn = 1;
                }
                freeCellsCount--;
                updatePlayerOnTurnDiv(playerOnTurn);

                if (isWinner(gameArr, previousPlayerOnTurn)) {
                    alert('Hráč ' + playerSymbol(previousPlayerOnTurn) + ' vyhrál');
                    gameOver = true;
                }
                else if (freeCellsCount === 0) {
                    alert('Pole je plné, hra skoncila remizou.');
                    gameOver = true;
                }

                if (gameOver) {
                    turnDiv.css("visibility", "hidden");
                    $("#publishResult").css("visibility", "visible");
                    $('.cell').addClass("disabled");
                }
            });

            row.append(cell);
        }
        gameField.append(row);
    };

}

FB.init({
    appId: '270556770302815',
    xfbml: true,
    version: 'v2.8'
});

// currently not working due to lack of permissions
// function post() {
//     // post message to facebook    
//     FB.api(
//         "/me/feed",
//         "POST",
//         {
//             "message": "This is a test message"
//         },
//         function (response) {
//             console.log(response);
//             if (response && !response.error) {
//                 /* handle the result */
//             }
//         }
//     );
// }

var publishOnFacebook = function () {
    alert('Tato funkce není v současné době dostupná.');

    // FB.getLoginStatus(function (response) {
    //     if (response.status === 'connected') {
    //         post();
    //     }
    //     else {
    //         FB.login(function (loginResponse) {
    //             if (loginResponse.status === 'connected') {
    //                 post();
    //             } else {
    //                 // user is not logged in
    //                 console.log("User was not successfully logged in");
    //             }
    //         }, { perms: 'publish_pages,manage_pages' });
    //     }
    // });
}


