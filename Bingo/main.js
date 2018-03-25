window.addEventListener('load', function() {

    /**
     * grab all variables what we need
     */
    let randomNumber = document.querySelector('.random-number'),
        numbersSection = document.querySelector('.numbers-section'),
        winnersSection = document.querySelector('.winners-section'),
        win = document.querySelector('.win'),
        message = document.querySelector('.message'),
        squareNum = [], // array with numbers from bingo-card
        winner = false,
        content = document.querySelector('.content'),
        winMessage = document.createElement('h5'),
        timerId;

    const numbersInput = document.querySelector('[name=numbers]'),
        configuration = document.querySelector('.configuration'),
        pageView = document.querySelector('.page-view'),
        btnCreate = document.querySelector('.btn-create'),
        btnRemove = document.querySelector('.btn-remove'),
        btnStart = document.querySelector('.btn-start'),
        btnStop = document.querySelector('.btn-stop'),
        btnStartNewGame = document.querySelector('.btn-new'),
        randomSection = document.querySelector('.random-section');

    pageView.innerHTML = 'Entry Page View';

    /**
     * add our event listeners
     */
    btnCreate.addEventListener('click', createButtonClicked);
    btnRemove.addEventListener('click', removeButtonClicked);
    btnStart.addEventListener('click', startButtonClicked);
    btnStop.addEventListener('click', stopButtonClicked);
    btnStartNewGame.addEventListener('click', startNewGame);

    /**
     * set starting state in game
     */
    entryPageView();

    /**
     * 'createButtonClicked' is function occurs when button 'Create Cards' is clicked
     * and set state from 'Entry Page View' to 'Generated Cards View'
     *
     * @return {object} newCard
     */
    function createButtonClicked() {
        let countUsers = document.getElementById('users'),
            countCards = document.getElementById('cards'),
            tableTemplate = document.getElementsByTagName("table")[0];

        for(let j = 1; j <= countUsers.value; j++) {
            let userContent = document.createElement('div'),
                userContentHeader = document.createElement('h4');
            userContentHeader.innerText = 'User ' +j;
            userContent.id = 'user_' + j;
            content.appendChild(userContent);
            userContent.appendChild(userContentHeader);
            for(let i = 0; i < countCards.value; i++) {
                let clonedTable = tableTemplate.cloneNode(true); // 'true' is for deep cloning
                clonedTable.classList.remove('template');
                clonedTable.dataset['user'] = j;
                clonedTable.dataset['idx'] = i;
                userContent.appendChild(clonedTable);
                newCard(clonedTable);
            }
        }

        generatedCardsView();
    }

    /**
     * removeButtonClicked is function occurs when button 'Remove Cards' is clicked
     * and set state from 'Generated Cards View' to 'Entry Page View'
     *
     * function remove cards from DOM and clearInterval for timer
     *
     */
    function removeButtonClicked() {
        document.querySelector('.content').innerHTML = '';
        try {
            clearInterval(timerId);
        } catch (e) {}

        entryPageView(); // back to Entry Page View
    }

    /**
     * 'startButtonClicked' is function occurs when button 'Start Game' is clicked
     * and set state from 'Generated Cards View' to 'Game View'
     *
     * @return {function} generateRandomNumber
     */
    function startButtonClicked() {
        pageView.innerHTML = 'Game View';
        btnStart.classList.remove('visible');
        btnStart.classList.add('hidden');
        btnStop.classList.remove('hidden');
        btnStop.classList.add('visible');
        numbersSection.classList.add('visible');
        winnersSection.classList.add('visible');
        randomSection.classList.remove('hidden');
        randomSection.classList.add('visible');

        generateRandomNumber();
    }

    /**
     * 'stopButtonClicked' is function occurs when button 'Stop' is clicked
     * and set state from 'Game View' to 'Generated Cards View'
     *
     */
    function stopButtonClicked() {
        clearInterval(timerId);
        generatedCardsView();
        btnStop.classList.remove('visible');
        btnStop.classList.add('hidden');
    }

    /**
     * 'startNewGame' is function occurs when button 'Start New Game' is clicked
     * and set state from 'Game View' to 'Entry Page View'
     *
     */
    function startNewGame() {
        removeButtonClicked();
        entryPageView();
    }

    /**
     * 'entryPageView' is function realized state 'Entry Page View' (show and hide buttons)
     */
    function entryPageView() {
        pageView.innerHTML = 'Entry Page View';
        randomSection.classList.remove('visible');
        randomSection.classList.add('hidden');
        btnCreate.classList.remove('hidden');
        btnCreate.classList.add('visible');
        configuration.classList.remove('hidden');
        configuration.classList.add('visible');
        numbersSection.classList.remove('visible');
        numbersSection.classList.add('hidden');
        winnersSection.classList.remove('visible');
        winnersSection.classList.add('hidden');
        btnRemove.classList.remove('visible');
        btnRemove.classList.add('hidden');
        btnStart.classList.remove('visible');
        btnStart.classList.add('hidden');
        btnStop.classList.remove('visible');
        btnStop.classList.add('hidden');
        btnStartNewGame.classList.remove('visible');
        btnStartNewGame.classList.add('hidden');
    }

    /**
     * 'generatedCardsView' is function realized state 'Generated Cards View' (show and hide buttons)
     */
    function generatedCardsView() {
        btnCreate.classList.remove('visible');
        btnCreate.classList.add('hidden');
        btnRemove.classList.remove('hidden');
        btnRemove.classList.add('visible');
        btnStart.classList.remove('hidden');
        btnStart.classList.add('visible');
        configuration.classList.remove('visible');
        configuration.classList.add('hidden');
        pageView.innerHTML = 'Generated Cards View';
        btnStartNewGame.classList.remove('visible');
        btnStartNewGame.classList.add('hidden');
    }


    /**
     * 'newCard' is function that generates bingo cards
     *
     * @param {object} card
     */
    function newCard(card) {
        let usedNums = [];

        for(let i=0; i < 25; i++) {
            let num = getUniqueNumber(usedNums);
            squareNum.push(num);
            card.querySelector('[data-id="'+i+'"]').innerText = num;
            card.querySelector('[data-id="'+i+'"]').dataset['num'] = num;
        }
    }

    /**
     * 'getUniqueNumber' is function that generates unique numbers
     * @param usedNums
     *
     */
    function getUniqueNumber(usedNums) {
        let newNum;
        do {
            newNum = Math.floor( Math.random() * (numbersInput.value) ) + 1;
        }
        while (usedNums[newNum]);
        usedNums[newNum] = true;
        return newNum;
    }

    /**
     * 'generateRandomNumber' is function that generates random numbers every 2 seconds
     * and add class 'selected' to card cell, if the numbers match
     *
     */
    function generateRandomNumber() {
        let generatedNums = [];
        // get random number every 2 seconds
        timerId = setInterval(function() {
            let randomGeneratedNumber = getUniqueNumber(generatedNums);
            randomNumber.innerHTML = randomGeneratedNumber;

            // write random generated number to section Numbers
            let ranNum = document.createElement('h5');
            ranNum.innerHTML = randomGeneratedNumber;
            win.appendChild(ranNum);
            let selectedCells = document.querySelectorAll(`[data-num="${randomGeneratedNumber}"]`);
            Array.prototype.forEach.call(selectedCells, (cellNode) => {
                cellNode.classList.add('selected');
            });

            checkResults();

            if(winner === true) {
                clearInterval(timerId);
            }

        }, 2000);
    }

    /**
     * check results(line is selected) and check winner functions
     **/
    function checkResults() {
        function checkSelectedLine(card) {
            let selectedRows = (card.dataset['selectedRows'] || "").split(",");
            for(let i = 0; i <= 4; i++) {
                if (selectedRows.includes(String(i))) {
                    continue;
                }

                let counter = 0;
                for(let j = i*5; j <= i*5+4; j++) {
                    let isCellSelected = card.querySelector(`[data-id="${j}"].selected`);
                    counter += isCellSelected ? 1 : 0;
                }

                if (counter === 5) {
                    selectedRows.push(i);
                    card.dataset['selectedRows'] = selectedRows.join(",");
                    winMessage.innerHTML = `USER ${card.dataset.user} has crossed the ${i} line in card ${card.dataset.idx}.`;
                    message.appendChild(winMessage);
                    break;
                }
            }
        }

        function checkWinner(card) {
            return card.querySelectorAll('[data-id].selected').length === 25;
        }


        let cards = document.querySelectorAll('.bingotable');
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            checkSelectedLine(card);
            let hasWinner = checkWinner(card);

            if (hasWinner) {
                winMessage.innerHTML = `USER ${card.dataset.user} in card ${card.dataset.idx} Won the Game!`;
                message.appendChild(winMessage);
                btnStop.classList.remove('visible');
                btnStop.classList.add('hidden');
                btnStartNewGame.classList.remove('hidden');
                btnStartNewGame.classList.add('visible');
                clearInterval(timerId);
                break;
            }
        }
    }

});