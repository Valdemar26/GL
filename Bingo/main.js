/**
 * Created by valdemar on 14.03.18.
 */

window.addEventListener('load', function() {

    let randomNumber = document.querySelector('.random-number'),
        numbersSection = document.querySelector('.numbers-section'),
        winnersSection = document.querySelector('.winners-section'),
        win = document.querySelector('.win'),
        squareNum = [], // array with numbers from bingo-card
        winner = false,
        content = document.querySelector('.content');
    let timerId;

    /**
     * work with Entry Page View
     */
    // grab everything we need
    const usersInput = document.querySelector('[name=users]'),
        cardsInput = document.querySelector('[name=cards]'),
        numbersInput = document.querySelector('[name=numbers]'),
        configuration = document.querySelector('.configuration'),
        pageView = document.querySelector('.page-view'),
        btnCreate = document.querySelector('.btn-create'),
        btnRemove = document.querySelector('.btn-remove'),
        btnStart = document.querySelector('.btn-start'),
        btnStop = document.querySelector('.btn-stop'),
        bingoTable = document.querySelector('.bingotable'),
        randomSection = document.querySelector('.random-section');

    pageView.innerHTML = 'Entry Page View';

    // add our event listeners
    btnCreate.addEventListener('click', createButtonClicked);
    btnRemove.addEventListener('click', removeButtonClicked);
    btnStart.addEventListener('click', startButtonClicked);
    btnStop.addEventListener('click', stopButtonClicked);

    // starting state
    entryPageView();

    // create the function that we'll need

    function removeSelected() {
        let allCells = document.querySelectorAll('.cell');
        [].forEach.call(allCells, function(e) {
            e.innerHTML = '';
            e.classList.remove('selected');
        });
    }

    function removeTable() {
        let allTables = document.querySelectorAll('.bingotable:not(.template)');
        Array.prototype.forEach.call(allTables, (table) => {
            table.parentNode.removeChild(table);
        })
    }

    function createButtonClicked() {
        let count_users = document.getElementById('users'),
            count_cards = document.getElementById('cards'),
            tableTemplate = document.getElementsByTagName("table")[0];

        for(let j = 1; j <= count_users.value; j++) {
            let userContent = document.createElement('div'),
                userContentHeader = document.createElement('h4');
            userContentHeader.innerText = 'User ' +j;
            userContent.id = 'user_' + j;
            content.appendChild(userContent);
            userContent.appendChild(userContentHeader);
            for(let i = 0; i < count_cards.value; i++) {
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

    function removeButtonClicked() {
        document.querySelector('.content').innerHTML = '';
        try {
            clearInterval(timerId);
        } catch (e) {}

        // back to Entry Page View
        entryPageView();
    }

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

    function stopButtonClicked() {
        generatedCardsView();
        btnStop.classList.remove('visible');
        btnStop.classList.add('hidden');
    }

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

        let allWinNumbers = document.querySelectorAll('h5');
        [].forEach.call(allWinNumbers, function(e) {
            e.innerHTML = '';
        });
    }
    
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
    }

    /**
     * end of Entry Page View
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

    function getUniqueNumber(usedNums) {
        let newNum;
        do {
            newNum = Math.floor( Math.random() * (numbersInput.value) ) + 1;
        }
        while (usedNums[newNum]);
        usedNums[newNum] = true;
        return newNum;
    }

    /* lottery random number (generate random number between 1 and 100 */
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
                console.log('clearInterval');
            }

        }, 100);
        /* todo fix to every 2000ms at line above and fix setTimeout */
        // stop after 15 seconds (just for demo)
        setTimeout(function() {
            clearInterval(timerId);
            console.log('stop');
        }, 15000);
    }

    /**
     * check winner
     *
     * todo remove function checkResults in another file!!!
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
                    winnersSection.innerHTML = `Line ${i+1} in card ${card.dataset.idx} is selected.`;
                    console.log('Line ' + i + ' in card ' + (card.dataset.idx+1) +' is selected');

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
                winnersSection.innerHTML = `User: ${card.dataset.user} in ${card.dataset.idx} Win the Game!`;
                console.log(`Winner!!!! User: ${card.dataset.user}, card: ${card.dataset.idx}`);
                clearInterval(timerId);
                break;
            }
        }
    }

});