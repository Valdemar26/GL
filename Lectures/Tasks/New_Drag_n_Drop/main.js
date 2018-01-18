/*
* 1. Define all variables
* 2. Create element 'img' and setAttribute and addClass 'x'
* 3. 'x' addEventListener to dragstart (preventDefault)
* 4.                         mousedown
* 5. getCoords and cloneNode of createdElement 'img'
* 6. add 'absolute' and zIndex to new element (avatar), appendChild, document.onmousemove and avatar.onmouseup
* 7. -//- the same for 'o'
* 8. common methods - function getCoords, moveAt, findPlace, placeElement
* */


let x_img  = document.createElement("img"),
    o_img = document.createElement("img"),
    field  = document.getElementById("field"),
    cell  = document.getElementsByClassName("cell"),
    x  = document.getElementById("x"),
    o = document.getElementById("o"),
    winnerMessage = document.getElementById('winner'),
    button = document.getElementById('startNewGame'),
    counter = 1;

winnerMessage.innerHTML = 'TEST';

//  CROSS SETTINGS

x_img.setAttribute("src", "x.png");
x_img.classList.add("x");

x.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

/* start new game */
button.addEventListener('click', function() {
    let i,
        cells = document.querySelectorAll('.cell');
    winnerMessage.innerHTML = '';
    for(i = 0; i < cells.length; i++) {
        cells[i].childNodes[0].remove();
        counter++;
    }
});

/**
 * Drag'N'Drop for a cross element
 */
x.addEventListener("mousedown", (e) => {

    // The cross is placed only on unpaired passages and еhe maximum number of moves is 9
    if(counter % 2 === 0 || counter > 9) {
        return;
    }

    let position   = checkPosition(x),
        shiftX   = e.pageX - position.left,
        shiftY   = e.pageY - position.top,
        avatarX = x_img.cloneNode(true); // avatar of original cross

    avatarX.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // the avatar is displayed above the other elements
    avatarX.style.position = 'absolute';
    avatarX.style.zIndex = 1000;

    document.body.appendChild(avatarX);
    moveAt(e, avatarX, shiftX, shiftY);

    document.onmousemove = e => {
        moveAt(e, avatarX, shiftX, shiftY);
    };

    avatarX.onmouseup = e => {
        document.onmousemove = null;
        avatarX.onmouseup = null;
        findPlace(avatarX, e.pageY, e.pageX);
        avatarX.remove(); // delete avatar
        counter++;
    };
});

//  CIRCLE SETTINGS

o_img.setAttribute("src", "o.png");
o_img.classList.add("o");

o.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

/**
 * Drag'N'Drop for a circle element
 */
o.addEventListener("mousedown", (e) => {

    // The circle is placed only on paired passages and еhe maximum number of moves is 9
    if(counter % 2 !== 0 || counter > 9) {
        return;
    }

    /* return who win */
    let winner = getWinner();
    if(winner) {
        if(winner === 'x') {
            winnerMessage.innerHTML = 'X win the game!';
        } else {
            winnerMessage.innerHTML = 'O win the game!';
        }
    }

    let position   = checkPosition(o),
        shiftX   = e.pageX - position.left,
        shiftY   = e.pageY - position.top,
        avatarO = o_img.cloneNode(true); // avatar of original circle

    avatarO.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // the avatar is displayed above the other elements
    avatarO.style.position = 'absolute';
    avatarO.style.zIndex = 1000;

    document.body.appendChild(avatarO);
    moveAt(e, avatarO, shiftX, shiftY);

    document.onmousemove = e => {
        moveAt(e, avatarO, shiftX, shiftY);
    };

    avatarO.onmouseup = e => {
        document.onmousemove = null;
        avatarO.onmouseup = null;
        findPlace(avatarO, e.pageY, e.pageX);
        avatarO.remove(); // delete avatar
        counter++;
    };
});

// COMMON METHODS

/**
 * Сalculate the correct position relative to the coordinates of the cursor
 *
 * @param {object} elem
 * @returns {object}
 */
function checkPosition(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

/**
 * Moves the element relative to the new mouse coordinates.
 *
 * @param {object} e
 * @param {object} element
 * @param {number} shiftX
 * @param {number} shiftY
 */
function moveAt(e, element, shiftX, shiftY) {
    element.style.left = e.pageX - shiftX + 'px';
    element.style.top = e.pageY - shiftY + 'px';
}

/**
 * Finding the right cell on the playing field
 *
 * @param {object} elem
 * @param {number} top
 * @param {number} left
 */
/* todo use switch/case */

// function findPlace(elem, top, left) {
//     if (top > 606 || left > 606) {
//         elem.remove();
//         return;
//     }
//
//     switch(top, left) {
//
//         case(top <= 606 && top > 404):
//             if (left <= 606 && left > 404) {
//                 placeElement(8, elem);
//             } else if (left <= 404 && left > 202) {
//                 placeElement(7, elem);
//             } else if (left <= 202 && left > 0) {
//                 placeElement(6, elem);
//             }
//             break;
//
//         case(top <= 404 && top > 202):
//             if (left <= 606 && left > 404) {
//                 placeElement(5, elem);
//             } else if (left <= 404 && left > 202) {
//                 placeElement(4, elem);
//             } else if (left <= 202 && left > 0) {
//                 placeElement(3, elem);
//             }
//             break;
//
//         case(top <= 202 && top > 0):
//             if (left <= 606 && left > 404) {
//                 placeElement(2, elem);
//             } else if (left <= 404 && left > 202) {
//                 placeElement(1, elem);
//             } else if (left <= 202 && left > 0) {
//                 placeElement(0, elem);
//             }
//             break;
//
//     }
// }


function findPlace(elem, top, left) {

    if (top > 606 || left > 606) {
        elem.remove();
        return;
    }

    if (elem.classList.contains("x")) {
        elem = x_img.cloneNode(true);
    } else if (elem.classList.contains("o")) {
        elem = o_img.cloneNode(true)
    }

    if (top <= 606 && top > 404) {

        if (left <= 606 && left > 404) {
            placeElement(8, elem);
        } else if (left <= 404 && left > 202) {
            placeElement(7, elem);
        } else if (left <= 202 && left > 0) {
            placeElement(6, elem);
        }

    } else if (top <= 404 && top > 202) {

        if (left <= 606 && left > 404) {
            placeElement(5, elem);
        } else if (left <= 404 && left > 202) {
            placeElement(4, elem);
        } else if (left <= 202 && left > 0) {
            placeElement(3, elem);
        }

    } else if (top <= 202 && top > 0) {

        if (left <= 606 && left > 404) {
            placeElement(2, elem);
        } else if (left <= 404 && left > 202) {
            placeElement(1, elem);
        } else if (left <= 202 && left > 0) {
            placeElement(0, elem);
        }

    }

    /**
     * If the cell is empty, it places the element in it
     *
     * @param {number} cellNumber
     * @param {object} elem
     */
    function placeElement(cellNumber, elem) {
        if (cell[cellNumber].children.length > 0) {
            return;
        } else {
            cell[cellNumber].classList.add(elem.classList[0]);
            cell[cellNumber].appendChild(elem);
        }
    }
}

    /* get winner function */
    function getWinner() {
        let cellsW = document.querySelectorAll('.cell'),
            cells = [[], [], []],
            i,
            j;
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3; j++) {
                let el = cellsW[i * 3 + j];
                if(el.classList.contains('x')) {
                    cells[i][j] = 'x';
                }
                if(el.classList.contains('o')) {
                    cells[i][j] = 'o';
                }
            }
        }

        if(
            ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
            ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
        ) {
            return cells[1][1];
        }

        for(i = 0; i < 2; i++) {
            if((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i])) {
                return cells[0][i];
            }
            if((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2])) {
                return cells[i][0];
            }
        }
    }

let winner = getWinner();
if (winner) {
    if (winner === 'x') {
        winnerMessage.innerHTML = 'X win';
        console.log('X win');
    } else  {
        winnerMessage.innerHTML = 'O win';
        console.log('O win');
    }
}