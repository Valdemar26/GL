/**
 * Created by valdemar on 14.03.18.
 */

window.addEventListener('load', function() {

    let createCards = document.querySelector('.create-cards');
    let randomNumber = document.querySelector('.random-number');
    let numbersSection = document.querySelector('.numbers-section');
    let winnersSection = document.querySelector('.winners-section');
    let win = document.querySelector('.win');
    let squareNum = []; // array with numbers from bingo-card
    let winner = false;

    /**
     * work with Entry Page View
     */
    // grab everything we need
    const usersInput = document.querySelector('[name=users]');
    const cardsInput = document.querySelector('[name=cards]');
    const numbersInput = document.querySelector('[name=numbers]');
    const configuration = document.querySelector('.configuration');
    const pageView = document.querySelector('.page-view');

    const btnCreate = document.querySelector('.btn-create');
    const btnRemove = document.querySelector('.btn-remove');
    const btnStart = document.querySelector('.btn-start');
    const btnStop = document.querySelector('.btn-stop');


    const bingoTable = document.querySelector('.bingotable');

    pageView.innerHTML = 'Entry Page View';

    // add our event listeners
    usersInput.addEventListener('input', calculatePieCost);
    cardsInput.addEventListener('input', calculatePieCost);
    numbersInput.addEventListener('input', calculatePieCost);

    btnCreate.addEventListener('click', createButtonClicked);
    btnRemove.addEventListener('click', removeButtonClicked);
    btnStart.addEventListener('click', startButtonClicked);
    btnStop.addEventListener('click', stopButtonClicked);


    // create the function that we'll need
    function calculatePieCost() {
        console.log('clicked');
    }

    function createButtonClicked() {
        generatedCardsView();
    }

    function removeButtonClicked() {

        let allCells = document.querySelectorAll('.cell');
        [].forEach.call(allCells, function(e) {
            e.innerHTML = '';
            e.classList.remove('selected');
        });

        bingoTable.classList.add('hidden');

        // back to Entry Page View
        entryPageView();
    }

    function startButtonClicked() {
        pageView.innerHTML = 'Game View';
        // btnStart.innerHTML = 'Stop';
        btnStart.classList.remove('visible');
        btnStart.classList.add('hidden');
        btnStop.classList.remove('hidden');
        btnStop.classList.add('visible');
        numbersSection.classList.add('visible');
        winnersSection.classList.add('visible');
    }

    function stopButtonClicked() {
        console.log('stop button clicked');
        generatedCardsView();
        btnStop.classList.remove('visible');
        btnStop.classList.add('hidden');
    }

    function entryPageView() {
        pageView.innerHTML = 'Entry Page View';
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
        configuration.classList.add('hidden');
        pageView.innerHTML = 'Generated Cards View';
    }

    /**
     * end of Entry Page View
     */


    let usedNums = new Array(76);// empty array with length 76

    function newCard() {
        //Starting loop through each square card
        for(let i=0; i < 25; i++) {
            setSquare(i);
        }
    }

    function setSquare(thisSquare) {
        let currSquare = "square"+thisSquare;
        let newNum;

        /* I doesn't understand what code in line below doing and remove it */
        //let colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);

        do {
            //newNum = (colPlace[thisSquare] * 15) + getNewNum() + 1;
            newNum = Math.floor(Math.random() * 100) + 1;
        }
        while (usedNums[newNum]);

        usedNums[newNum] = true;
        document.getElementById(currSquare).innerHTML = newNum;

        squareNum.push(newNum);

    }


    /* todo maybe need to remove this unused function */
    function getNewNum() {
        return Math.floor(Math.random() * 75); // todo WHY 75 ?
    }

    /* lottery random number (generate random number between 1 and 100 */
    /* todo create random colors */
    function randomColor() {
        // https://stackoverflow.com/questions/31929833/generating-a-random-background-color-every-second
    }

    function generateRandomNumber() {
        // get random number every 2 seconds
        let timerId = setInterval(function() {
            let randomGeneratedNumber = Math.floor(Math.random() * 100) + 1;
            randomNumber.innerHTML = randomGeneratedNumber;
            randomNumber.style.background = randomColor();

            // write random generated number to section Numbers
            let ranNum = document.createElement('h5');
            ranNum.innerHTML = randomGeneratedNumber;
            win.appendChild(ranNum);
            console.log(randomGeneratedNumber);

            for(let i = 0; i < squareNum.length; i++) {
                if(randomGeneratedNumber === squareNum[i]) {
                    document.getElementById(`square${i}`).classList.add('selected');
                }
            }

            getWinner();

            if(winner === true) {
                clearInterval(timerId);
                console.log('clearInterval');
            }

        }, 100);
        /* todo fix to every 2000ms at line above and fix setTimeout */
        // stop after 11 seconds (just for demo)
        setTimeout(function() {
            clearInterval(timerId);
            console.log('stop');
        }, 2000);
    }

    /**
     * check winner
     *
     * todo remove function getWinner in another file!!!
     **/
    function getWinner() {
        let square0 = document.getElementById('square0');
        let square1 = document.getElementById('square1');
        let square2 = document.getElementById('square2');
        let square3 = document.getElementById('square3');
        let square4 = document.getElementById('square4');

        let square5 = document.getElementById('square5');
        let square6 = document.getElementById('square6');
        let square7 = document.getElementById('square7');
        let square8 = document.getElementById('square8');
        let square9 = document.getElementById('square9');

        let square10 = document.getElementById('square10');
        let square11 = document.getElementById('square11');
        let square12 = document.getElementById('square12');
        let square13 = document.getElementById('square13');
        let square14 = document.getElementById('square14');

        let square15 = document.getElementById('square15');
        let square16 = document.getElementById('square16');
        let square17 = document.getElementById('square17');
        let square18 = document.getElementById('square18');
        let square19 = document.getElementById('square19');

        let square20 = document.getElementById('square20');
        let square21 = document.getElementById('square21');
        let square22 = document.getElementById('square22');
        let square23 = document.getElementById('square23');
        let square24 = document.getElementById('square24');

        let winnerCount = 0;
        let message = document.querySelector('.message');

        if( square0.classList.contains('selected') && square1.classList.contains('selected')
            && square2.classList.contains('selected') && square3.classList.contains('selected')
            && square4.classList.contains('selected') ) {
            console.log(`USER X crossed the 1 line`);
            winnerCount++;

            // write message to Winners Section
            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X crossed the 1 line`;
            message.appendChild(winnerMessage);
        }

        if( square5.classList.contains('selected') && square6.classList.contains('selected')
            && square7.classList.contains('selected') && square8.classList.contains('selected')
            && square9.classList.contains('selected') ) {
            console.log(`USER X crossed the 2 line`);
            winnerCount++;

            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X crossed the 2 line`;
            message.appendChild(winnerMessage);
        }

        if( square10.classList.contains('selected') && square11.classList.contains('selected')
            && square12.classList.contains('selected') && square13.classList.contains('selected')
            && square14.classList.contains('selected') ) {
            console.log(`USER X crossed the 3 line`);
            winnerCount++;

            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X crossed the 3 line`;
            message.appendChild(winnerMessage);
        }

        if( square15.classList.contains('selected') && square16.classList.contains('selected')
            && square17.classList.contains('selected') && square18.classList.contains('selected')
            && square19.classList.contains('selected') ) {
            console.log(`USER X crossed the 4 line`);
            winnerCount++;

            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X crossed the 4 line`;
            message.appendChild(winnerMessage);
        }

        if( square20.classList.contains('selected') && square21.classList.contains('selected')
            && square22.classList.contains('selected') && square23.classList.contains('selected')
            && square24.classList.contains('selected') ) {
            console.log(`USER X crossed the 5 line`);
            winnerCount++;

            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X crossed the 5 line`;
            message.appendChild(winnerMessage);
        }

        /* check if all cards are selected and game finished */
        if(winnerCount === 5) {
            console.log('USER X won the Game! Congrats!');
            winner = true;

            let winnerMessage = document.createElement('h4');
            winnerMessage.innerHTML = `USER X won the Game! Congrats!`;
            message.appendChild(winnerMessage);

        }

    }


    // create new card at first time
    newCard();
    generateRandomNumber();

    // create new card by click the button (or link)
    createCards.addEventListener('click', function() {
       newCard();
       generateRandomNumber();
    });

    /* todo chech if square is
    *
    * for (int i = 0; i < 5; i++)
     {
     if (!u[a[i][n - 1 - i]])
     return false;
     }
     return true;
    *
    * */

});