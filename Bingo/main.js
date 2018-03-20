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
    let content = document.querySelector('.content');

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
    const randomSection = document.querySelector('.random-section');

    pageView.innerHTML = 'Entry Page View';

    // add our event listeners
    usersInput.addEventListener('input', testInput);
    cardsInput.addEventListener('input', testInput);
    numbersInput.addEventListener('input', testInput);

    btnCreate.addEventListener('click', createButtonClicked);
    btnRemove.addEventListener('click', removeButtonClicked);
    btnStart.addEventListener('click', startButtonClicked);
    btnStop.addEventListener('click', stopButtonClicked);

    // starting state
    entryPageView();

    // create the function that we'll need
    function testInput() {
        console.log('input was clicked');
    }

    function removeSelected() {
        let allCells = document.querySelectorAll('.cell');
        [].forEach.call(allCells, function(e) {
            e.innerHTML = '';
            e.classList.remove('selected');
        });
    }

    function removeTable() {
        let allTables = document.querySelectorAll('.bingotable');
        // let tableCopy = document.querySelectorAll('template').splice(1);
        // [].forEach.call(tableCopy, function(e) {
        //     content.removeChild(tableCopy);
        // });
        [].forEach.call(allTables, function(e) {
            e.classList.add('template');
            //content.removeChild(tableCopy); //todo need to use this code, but it doesn't work, because remove first table
        })
    }

    function createButtonClicked() {
        let count_users = document.getElementById('users');
        let count_cards = document.getElementById('cards');
        //console.log(count_users.value);
        let myTable = document.getElementsByTagName("table")[0];

        let myClone;

        for(let j = 1; j <= count_users.value; j++) {
            let create_content_user = document.createElement('div');
            let content_user_header = document.createElement('h4');
            content_user_header.innerText = 'User ' +j;
            create_content_user.id = 'user_' + j;
            content.appendChild(create_content_user);
            create_content_user.appendChild(content_user_header);
            for(let i = 0; i < count_cards.value; i++) {
                myClone = myTable.cloneNode(true); // the true is for deep cloning
                myClone.classList.remove('template');
                //document.body.appendChild(myClone);
                //let cells = document.querySelectorAll('.cell');
                //bingoTable.
                // let all_cell = myClone.querySelectorAll('.cell');
                // console.log(all_cell.length);
                create_content_user.appendChild(myClone);
                //console.log(myClone.rows);
            }
            //let user_container = document.getElementById('user_' + j);
            //console.log(user_container);
            newCard('user_' + j);
        }
        // let clone_times = myClone.repeat(count_cards.value);
        // document.body.appendChild(clone_times);

        generatedCardsView();
    }

    function removeButtonClicked() {

        removeSelected();

        removeTable(); // remove all generated table

        //bingoTable.classList.add('hidden');

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

        console.log('inputs data: ', usersInput.value, cardsInput.value, numbersInput.value);

        //newCard();
        generateRandomNumber();
    }

    function stopButtonClicked() {
        console.log('stop button clicked');
        generatedCardsView();
        btnStop.classList.remove('visible');
        btnStop.classList.add('hidden');
    }

    function entryPageView() {
        pageView.innerHTML = 'Entry Page View';
        // bingoTable.classList.remove('visible');
        // bingoTable.classList.add('hidden');
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
        // bingoTable.classList.remove('hidden');
        // bingoTable.classList.add('visible');
        pageView.innerHTML = 'Generated Cards View';
        removeSelected();
    }

    /**
     * end of Entry Page View
     */


    let usedNums = new Array(76);// empty array with length 76

    function newCard(user) {
        //Starting loop through each square card
        for(let i=0; i < 25; i++) {
            setSquare(i, user);
        }
    }

    function setSquare(thisSquare, user) {
        console.log(user);
        let user_id = document.getElementById(user);
        let currSquare = "square"+thisSquare;
        let newNum;

        /* I doesn't understand what code in line below doing and remove it */
        let colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);

        do {
            newNum = (colPlace[thisSquare]) + getNewNum() + 1;
            //newNum = Math.floor( Math.random() * (numbersInput.value) ) + 1;
        }
        while (usedNums[newNum]);

        usedNums[newNum] = true;
        console.log(user_id.querySelector('#' + currSquare).innerText = newNum);
        user_id.querySelector('#' + currSquare).innerHTML = newNum;
        //.innerHTML = newNum;
        //document.getElementById(currSquare).innerHTML = newNum;

        squareNum.push(newNum);

    }

    function getNewNum() {
        return Math.floor( Math.random() * (numbersInput.value) ) + 1;
    }

    /* lottery random number (generate random number between 1 and 100 */
    function generateRandomNumber(table) {
        // get random number every 2 seconds
        let timerId = setInterval(function() {
            let randomGeneratedNumber = Math.floor( Math.random() * (numbersInput.value) ) + 1;
            randomNumber.innerHTML = randomGeneratedNumber;

            // write random generated number to section Numbers
            let ranNum = document.createElement('h5');
            ranNum.innerHTML = randomGeneratedNumber;
            win.appendChild(ranNum);
            console.log(randomGeneratedNumber);

            for(let i = 0; i < squareNum.length; i++) {
                if(randomGeneratedNumber === squareNum[i]) {
                    document.getElementById(`square${i}`).classList.add('selected'); // todo fix
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
    // newCard();
    // generateRandomNumber();

    // create new card by click the button (or link)
    // createCards.addEventListener('click', function() {
    //    newCard();
    //    generateRandomNumber();
    // });

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