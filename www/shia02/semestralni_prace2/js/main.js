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

            //left
            if (columnIndex - winSize >= 0) {
                correctCount = 0;
                for (var i = columnIndex; i > columnIndex - winSize; i--) {
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

            //up
            if (rowIndex - winSize >= 0) {
                correctCount = 0;
                for (var i = rowIndex; i > rowIndex - winSize; i--) {
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

            if (rowIndex + winSize <= size && columnIndex - winSize >= 0) {
                //diagonally left-down
                correctCount = 0;
                for (var i = rowIndex, j = columnIndex; i < rowIndex + winSize; i++ , j--) {
                    if (gameArr[i][j] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }

            if (rowIndex - winSize >= 0 && columnIndex - winSize >= 0) {
                //diagonally left-up
                correctCount = 0;
                for (var i = rowIndex, j = columnIndex; i > rowIndex - winSize; i-- , j--) {
                    if (gameArr[i][j] === player) {
                        correctCount++;
                    }
                }
                if (correctCount === winSize) {
                    return true;
                }
            }

            if (rowIndex - winSize >= 0 && columnIndex + winSize <= size) {
                //diagonally right-up
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

var playerSymbol = function(player) {
    if (player === 1) {
        return "X";
    }
    if (player === 2) {
        return  "O";
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
        alert("Je potreba vyplnit vsechna pole");
        return;
    }

    if (controlWinSize > controlSize) {
        alert("PROBLEM");
        return;
    }

    if (controlSize < 3 || controlSize > 15) {
        alert("PROBLEM");
        return;
    }
    size = controlSize;

    if (controlWinSize < 3 || controlWinSize > 5) {
        alert("PROBLEM");
        return;
    }
    winSize = controlWinSize;

    gameArr = createArray(size);
    freeCellsCount = size * size;
    gameOver = false;
    playerOnTurn = 1;
    gameField.empty();
    updatePlayerOnTurnDiv(playerOnTurn);
    turnDiv.show();

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
                if (gameArr[rowIndex][columnIndex] != null) {
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
                    // TODO: zamkni hrací plochu
                    gameOver = true;
                    turnDiv.hide();
                }
                else if (freeCellsCount === 0) {
                    alert('Pole je plné, hra skoncila remizou.');
                    gameOver = true;
                    turnDiv.hide();
                }


            });

            row.append(cell);
        }
        gameField.append(row);
    };

}

//startGame();


