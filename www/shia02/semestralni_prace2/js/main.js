var gameField = $('#game-field');
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

// create game field
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
            if (playerOnTurn === 1) {
                this.innerText = 'X';
                playerOnTurn = 2;
            } else {
                this.innerText = 'O';
                playerOnTurn = 1;
            }
            freeCellsCount--;

            if (isWinner(gameArr, previousPlayerOnTurn)) { 
                alert('Hráč ' + playerOnTurn + ' vyhrál');
                // TODO: zamkni hrací plochu
                gameOver = true;
            }
            else if (freeCellsCount === 0) {
                alert('Pole je plné, hra skoncila remizou.');
                gameOver = true;
            }


        });

        row.append(cell);
    }
    gameField.append(row);
};

