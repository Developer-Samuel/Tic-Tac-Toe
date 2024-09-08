$(document).ready(function () {
    let currentTurn = 'X';
    let xScore = 0;
    let oScore = 0;
    let tieScore = 0;
    let gameActive = true;
    let lastStartingPlayer = 'X';

    function switchTurn() {
        currentTurn = currentTurn === 'X' ? 'O' : 'X';
        $('#turn-x').toggleClass('active');
        $('#turn-o').toggleClass('active');
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let board = $('.fields .item span').map(function () {
            return $(this).text();
        }).get();

        for (let combination of winningCombinations) {
            let [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes('') ? null : 'TIE';
    }

    function updateScore(winner) {
        if (winner === 'X') {
            xScore++;
            $('.score .item').eq(0).find('.count-number').text(xScore);
            $('.winner').text('Winner is you (X) !').show();
        } else if (winner === 'O') {
            oScore++;
            $('.score .item').eq(2).find('.count-number').text(oScore);
            $('.winner').text('Winner is computer (O) !').show();
        } else if (winner === 'TIE') {
            tieScore++;
            $('.score .item').eq(1).find('.count-number').text(tieScore);
            $('.winner').text('TIE !').show();
        }
    }

    function computerMove() {
        let emptyCells = $('.fields .item span').filter(function () {
            return $(this).text() === '';
        });

        if (emptyCells.length > 0) {
            let randomCell = emptyCells.eq(Math.floor(Math.random() * emptyCells.length));
            randomCell.text('O');
            let winner = checkWinner();
            if (winner) {
                updateScore(winner);
                $('.turn').hide();
                gameActive = false;
            } else {
                switchTurn();
            }
        }
    }

    $('.fields .item').on('click', function () {
        if ($(this).find('span').text() === '' && gameActive && currentTurn === 'X') {
            $(this).find('span').text(currentTurn);
            let winner = checkWinner();
            if (winner) {
                updateScore(winner);
                $('.turn').hide();
                gameActive = false;
            } else {
                switchTurn();
                if (gameActive) {
                    setTimeout(computerMove, 1000);
                }
            }
        }
    });

    $('#reset-game').on('click', function () {
        $('.fields .item span').empty();
        gameActive = true;
        currentTurn = lastStartingPlayer === 'X' ? 'O' : 'X';
        $('#turn-o').toggleClass('active', currentTurn === 'O');
        $('#turn-x').toggleClass('active', currentTurn === 'X');
        $('.turn').show();
        $('.winner').hide();

        lastStartingPlayer = currentTurn;

        if (currentTurn === 'O') {
            setTimeout(computerMove, 100);
        }
    });
});
