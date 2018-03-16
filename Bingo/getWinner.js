/**
 * Created by valdemar on 15.03.18.
 */

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

        let winnerMessage = document.createElement('h4');
        winnerMessage.innerHTML = `USER X won the Game! Congrats!`;
        message.appendChild(winnerMessage);

    }


    /**
     * code below doesn't work
     *
     * todo maybe need to remove code
     */
    // let cellsD = document.querySelectorAll('.cell');
    // let cells = [[], [], [], [], []];
    // let i;
    // for (i = 0; i < 5; i++) {
    //     for (let j = 0; j < 5; j++) {
    //         let el = cellsD[i * 5 + j];
    //         if (el.classList.contains('selected')) {
    //             cells[i][j] = 'selected';
    //         }
    //     }
    // }
    //
    //
    // /* check if diagonal is selected */
    // if (
    //     ( (cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])
    //     && (cells[2][2] === cells[3][3]) && (cells[3][3] === cells[4][4]) )
    //     ||
    //     ( (cells[4][0] === cells[3][1]) && (cells[3][1] === cells[2][2])
    //     && (cells[2][2] === cells[1][3]) && (cells[1][3] === cells[0][4]) )
    // ) {
    //     console.log('USER X crossed the diagonal');
    //     return cells[1][1];
    // }
    //
    // if(
    //     ( (cells[0][0] === cells[1][0]) && (cells[1][0] === cells[2][0])
    //     && (cells[2][0] === cells[3][0]) && (cells[3][0] === cells[4][0]) )
    // ) {
    //     console.log('USER X crossed the 1 line');
    // }
    // if(
    //     ( (cells[0][1] === cells[1][1]) && (cells[1][1] === cells[2][1])
    //     && (cells[2][1] === cells[3][1]) && (cells[3][1] === cells[4][1]) )
    // ) {
    //     console.log('USER X crossed the 2 line');
    // }
    // if(
    //     ( (cells[0][2] === cells[1][2]) && (cells[1][2] === cells[2][2])
    //     && (cells[2][2] === cells[3][2]) && (cells[3][2] === cells[4][2]) )
    // ) {
    //     console.log('USER X crossed the 3 line');
    // }
    // if(
    //     ( (cells[0][3] === cells[1][3]) && (cells[1][3] === cells[2][3])
    //     && (cells[2][3] === cells[3][3]) && (cells[3][3] === cells[4][3]) )
    // ) {
    //     console.log('USER X crossed the 4 line');
    // }
    // if(
    //     ( (cells[0][4] === cells[1][4]) && (cells[1][4] === cells[2][4])
    //     && (cells[2][4] === cells[3][4]) && (cells[3][4] === cells[4][4]) )
    // ) {
    //     console.log('USER X crossed the 5 line');
    // }

    // for (i = 0 ; i < 4; i++) {
    //     if ((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i])) {
    //         return cells[0][i];
    //     }
    //     if ((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2])) {
    //         return cells[i][0];
    //     }
    // }

}