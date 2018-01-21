(function () {
    let matrix,
        isGameOver = false,
        lastSuccessType = null,
        winner = document.getElementById('winner');

    init();
    attachEvents();

    function init() {
        reset();
    }

    function attachEvents() {
        document.getElementById('startNewGame').addEventListener('click', reset);

        document.querySelectorAll('.x-o')
            .forEach(item => item.addEventListener('mousedown', (e) => {
                const newType = item.id;

                if (isGameOver || newType === lastSuccessType) {
                    return;
                }

                const defaultCursor = document.body.style.cursor;
                const onMouseUp = (e) => {
                    document.body.style.cursor = defaultCursor;
                    document.body.removeEventListener('mouseup', onMouseUp);

                    const clonedElement = item.cloneNode();
                    const target = e.target;

                    if (target.childElementCount !== 0) {
                        return;
                    }

                    target.appendChild(clonedElement);
                    document.dispatchEvent(new CustomEvent('xoAdded', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            index: +target.dataset['index'],
                            value: newType
                        }
                    }));
                };

                document.body.style.cursor = 'pointer';
                document.body.addEventListener('mouseup', onMouseUp);
                e.preventDefault();
            }));

        document.addEventListener('xoAdded', (e) => {
            const index = e.detail.index;
            const value = e.detail.value;
            const row = Math.floor(index / 3);
            const col = index % 3;

            matrix[row][col] = value;
            lastSuccessType = value;
            checkResult();
        });
    }

    function reset() {
        isGameOver = false;
        lastSuccessType = null;
        document.querySelectorAll('.cell').forEach(el => (el.innerHTML = ''));
        winner.innerHTML = '';
        matrix = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    }

    function checkResult() {
        function checkFullRow(type) {
            for (let i = 0; i <= 2; i++) {
                let counter = 0;
                for (let j = 0; j <= 2; j++) {
                    if(matrix[i][j] === type) {
                        counter++;
                    }
                }
                if (counter === 3) {
                    return true;
                }
            }

            return false;
        }

        function checkFullCol(type) {
            for (let i = 0; i <= 2; i++) {
                let counter = 0;
                for (let j = 0; j <= 2; j++) {
                    if (matrix[j][i] === type) {
                        counter++;
                    }
                }
                if (counter === 3) {
                    return true;
                }
            }

            return false;
        }
        function checkDiagonal(type) {
            let counterMainDiagonal = 0;
            let counterForeignDiagonal = 0;
            for (let i = 0; i<=2; i++) {
                if (matrix[i][i] === type) {
                    counterMainDiagonal++;
                }

                if (matrix[i][2-i] === type) {
                    counterForeignDiagonal++;
                }
            }

            return (counterMainDiagonal === 3) || (counterForeignDiagonal === 3);
        }

        function checkFullfill() {
            let counter = 0;
            for (let i = 0; i <= 2; i++) {
                for (let j = 0; j <= 2; j++) {
                    if (matrix[i][j] !== null) {
                        counter ++;
                    }
                }
            }

            return (counter === 9);
        }

        for (type of ['x', 'o']) {
            let isTypeWon = checkFullRow(type) || checkFullCol(type) || checkDiagonal(type);

            if (isTypeWon) {
                winner.innerHTML = `"${type}" Won! the game! Congrats!`;
                isGameOver = true;
                return;
            }
        }

        const isDraw = checkFullfill();
        if (isDraw) {
            winner.innerHTML = 'Draw';
            isGameOver = true;
        }
    }
})();
