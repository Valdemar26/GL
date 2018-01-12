/*
* 1. Define all variables
* 2. Create element 'img' and setAttribute and addClass 'x'
* 3. 'x' addEventListener to dragstart (preventDefault)
* 4.                         mousedown
* 5. getCoords and cloneNode of createdElement 'img'
* 6. add 'absolute' and zIndex to new element (avatar), appendChild, document.onmousemove and avatar.onmouseup
* 7. -//- the same for 'o'
* 8. common methods - function getCoords, moveAt, findPlace, placeElement
*
*
* */


// /* 1 */
let x = document.getElementById('x'),
    o = document.getElementById('o'),
    field = document.getElementById('field'),
    winnerMessage = document.getElementsByClassName('.winnerMessage'),
    button = document.getElementById('startNewGame'),
    cells = document.getElementsByClassName('.cell'),
    nextMove = 'x',
    step = 1;

/* 2   x_img === cross */
let x_img = document.createElement('img');
x_img.setAttribute("src", 'x.png');
x_img.setAttribute("height", "140");
x_img.setAttribute("width", "140");
x_img.setAttribute('class', 'x');

// /* 3 */

/* prevent default browser drag-n-drop event */
x_img.ondragstart = function() {
    return false;
};

// /* 4 */
x_img.addEventListener('mousedown', (e) => {

    // The cross is placed only on unpaired passages and еhe maximum number of moves is 9
    if(step % 2 === 0 || step > 9) {
        return;
    }

    let coords = getCoords(x_img),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top,
        x_avatar = x_img.cloneNode(true);

    // check if mouse pressed and prepare to moved
    x_avatar.style.position = 'absolute';

    // show X under another elements
    x_avatar.style.zIndex = 1000;

    // move X or O in body
    document.body.appendChild(x_avatar);
    moveAt(e);

    // move X under cursor
    function moveAt(e) {
        x_avatar.style.left = e.pageX - shiftX + 'px';
        x_avatar.style.top = e.pageY - shiftY + 'px';
    }

    // check when moving is finished
    x_avatar.onmouseup = function(e) {
        document.onmousemove = null;
        x_avatar.onmouseup = null;
        x_avatar.onmousedown = null; // stop moving
        findPlace(x_avatar, e.pageY, e.pageX);
        x_avatar.remove();
        step++;
        nextMove = 'o';
    };

});

// /* 7 */
let o_img = document.createElement('img');
o_img.setAttribute("src", 'x.png');
o_img.setAttribute("height", "140");
o_img.setAttribute("width", "140");
o_img.setAttribute('class', 'x');

/* prevent default browser drag-n-drop event */
o_img.ondragstart = function() {
    return false;
};

o_img.addEventListener('mousedown', (e) => {

    // The cross is placed only on unpaired passages and еhe maximum number of moves is 9
    if(step % 2 !== 0 || step > 9) {
        return;
    }

    let coords = getCoords(o_img),
        shiftX = e.pageX - coords.left,
        shiftY = e.pageY - coords.top,
        o_avatar = o_img.cloneNode(true);

    // check if mouse pressed and prepare to moved
    o_avatar.style.position = 'absolute';

    // show X under another elements
    o_avatar.style.zIndex = 1000;

    // move X or O in body
    document.body.appendChild(o_avatar);
    moveAt(e);

    // move X under cursor
    function moveAt(e) {
        o_avatar.style.left = e.pageX - shiftX + 'px';
        o_avatar.style.top = e.pageY - shiftY + 'px';
    }

    // check when moving is finished
    o_avatar.onmouseup = function(e) {
        document.onmousemove = null;
        o_avatar.onmouseup = null;
        o_avatar.onmousedown = null; // stop moving
        findPlace(o_avatar, e.pageX, e.pageY);
        o_avatar.remove();
        step++;
        nextMove = 'x';
    };

});

// /* 8 */
/* getCoords function */
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    }
}

// function findPlace(elem, left, top) {
//     if(elem.classList.contains('x_img')) {
//         elem = x_img.cloneNode(true);
//     } else if (elem.classList.contains('o_img')) {
//         elem = o_img.cloneNode(true);
//     }
// }
function findPlace(elem, top, left) {

    if (top > 606 || left > 606) {
        elem.remove();
        return;
    }

    if (elem.classList.contains("cross")) {
        elem = cross.cloneNode(true);
    } else if (elem.classList.contains("circle")) {
        elem = circle.cloneNode(true)
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
}

function placeElement(cellNumber, elem) {
    if (cells[cellNumber].children.length > 0) {
        return;
    } else {
        cells[cellNumber].appendChild(elem);
    }

}

// /* start new game */
button.addEventListener('click', function() {
    let i,
        cell = document.querySelectorAll('.cell');
    for(i = 0; i < cell.length; i++) {
        cell[i].classList.remove('x');
        cell[i].classList.remove('o');
    }
    nextMove = 'x';
    winnerMessage.innerHTML = '';
});


/* old code */
// window.addEventListener('load', function(e) {
//     console.log('loaded');
//     let x = document.getElementById('x'),
//         o = document.getElementById('o');
//     // let x_o = document.getElementsByClassName('x-o');
//     let winnerMessage = document.querySelector('.winnerMessage');
//     let button = document.querySelector('.startNewGame');
//     let cells = document.querySelectorAll('.cell');
//     let field = document.getElementById('field');
//     let nextMove = 'x';
//
//
//     x.onmousedown =  function(e) {
//         let coords = getCoords(x),
//             shiftX = e.pageX - coords.left,
//             shiftY = e.pageY - coords.top;
//
//         // check if mouse pressed and prepare to moved
//         x.style.position = 'absolute';
//         moveAt(e);
//
//         // move X or O in body
//         document.body.appendChild(x);
//         //field.appendChild(x);
//         // cells.target.appendChild(x);
//
//         // show X or O under another elements todo - check if it is necessary?
//         x.style.zIndex = 1000;
//
//         // move X or O under cursor
//         function moveAt(e) {
//             x.style.left = e.pageX - shiftX + 'px';
//             x.style.top = e.pageY - shiftY + 'px';
//         }
//
//         // move on screen
//         document.onmousemove = function(e) {
//             moveAt(e);
//         };
//
//         // check when moving is finished
//         x.onmouseup = function(e) {
//             let target = e.target.parentNode.childNodes.currentTarget;
//             console.log(e.target);
//             //e.target.appendChild(document.getElementById('field'));
//             // if(elem.classList.contains('cell')) {
//             //     // adding image to cell
//             //     let img = document.createElement("img");
//             //     img.setAttribute("src", 'x.png');
//             //     img.setAttribute("height", "140");
//             //     img.setAttribute("width", "140");
//             //     elem.appendChild(img);
//             // }
//             // let xxx = document.querySelectorAll('.cell');
//             // let target = e.target;
//             // if(target.tagName !== 'DIV') {
//             //     return
//             // } else {
//             //     // let img = document.createElement("img");
//             //     // img.setAttribute("src", 'x.png');
//             //     // img.setAttribute("height", "140");
//             //     // img.setAttribute("width", "140");
//             //     // img.setAttribute('id', 'x');
//             //     xxx.target.appendChild(o);
//             // }
//
//             // document.ondragenter = true;
//             document.onmousemove = null;
//             x.onmouseup = null;
//             x.onmousedown = null; // stop moving
//             generateNewX();
//             // for(let i = 0; i < cells.length; i++) {
//             //     cells[i].classList.remove('cell'); // remove class cell
//             //     cells[i].classList.add('cell', 'x'); // add class cell and x
//             // }
//         };
//
//         // prevent default browser drag-n-drop event
//         x.ondragstart = function() {
//             return false;
//         };
//
//     };
//
//     /* same code for 'o' */
//     o.onmousedown = function(e) {
//         let coords = getCoords(o),
//             shiftX = e.pageX - coords.left,
//             shiftY = e.pageY - coords.top;
//
//         // check if mouse pressed and prepare to moved
//         o.style.position = 'absolute';
//         moveAt(e);
//
//         // move X or O in body
//         document.body.appendChild(o);
//
//         // show X or O under another elements todo - check if it is necessary?
//         o.style.zIndex = 1000;
//
//         // move X or O under cursor
//         function moveAt(e) {
//             o.style.left = e.pageX - shiftX + 'px';
//             o.style.top = e.pageY - shiftY + 'px';
//         }
//
//         // move on screen
//         document.onmousemove = function(e) {
//             moveAt(e);
//         };
//
//         // check when moving is finished
//         o.onmouseup = function(e) {
//             // var xxx = e.clientX, yyy = e.clientY,
//             //     elementMouseIsOver = document.elementFromPoint(xxx, yyy);
//             //
//             // elementMouseIsOver.className += ' хня';
//             // alert(elementMouseIsOver);
//             //cell.target.className += 'o'; // add class cell and o
//             //cell.target.className += 'sukrrrrrrrrrr';
//             console.log(e);
//             document.onmousemove = null;
//             o.onmouseup = null;
//             o.onmousedown = null;
//             // for(let i = 0; i < cells.length; i++) {
//             //     cells[i].classList.remove('cell'); // remove class cell
//             //     cells[i].classList.add('cell', 'x'); // add class cell and x
//             // }
//             generateNewO();
//             console.log('stop moving');
//         };
//
//         // prevent default browser drag-n-drop event
//         o.ondragstart = function() {
//             return false;
//         };
//
//     };
//
//     /* getCoords function */
//     function getCoords(elem) {
//         let box = elem.getBoundingClientRect();
//         return {
//             top: box.top + pageYOffset,
//             left: box.left + pageXOffset
//         }
//     }
//
//     /* generate new images */
//     function generateNewX() {
//         let er = document.getElementById('choose');
//         let img = document.createElement("img");
//         img.setAttribute("src", 'x.png');
//         img.setAttribute("height", "140");
//         img.setAttribute("width", "140");
//         img.setAttribute('id', 'x');
//         er.appendChild(img);
//     }
//
//     function generateNewO() {
//         let er = document.getElementById('choose');
//         let img = document.createElement("img");
//         img.setAttribute("src", 'o.png');
//         img.setAttribute("height", "140");
//         img.setAttribute("width", "140");
//         img.setAttribute('id', 'o');
//         er.appendChild(img);
//     }
//
//
//     /* start new game */
//     button.addEventListener('click', function() {
//         let i,
//             cell = document.querySelectorAll('.cell');
//         for(i = 0; i < cell.length; i++) {
//             cell[i].classList.remove('x');
//             cell[i].classList.remove('o');
//         }
//         nextMove = 'x';
//         winnerMessage.innerHTML = '';
//     });
//
//     /* get winner function */
//     function getWinner() {
//         let cellsD = document.querySelectorAll('.cell'),
//             cells = [[], [], []],
//             i,
//             j;
//         for(i = 0; i < 3; i++) {
//             for(j = 0; j < 3; j++) {
//                 let el = cellsD[i * 3 + j];
//                 if(el.classList.contains('x')) {
//                     cells[i][j] = 'x';
//                 }
//                 if(el.classList.contains('o')) {
//                     cells[i][j] = 'o';
//                 }
//             }
//         }
//
//         if(
//             ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
//             ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
//         ) {
//             return cells[1][1];
//         }
//
//         for(i = 0; i < 2; i++) {
//             if((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i])) {
//                 return cells[0][i];
//             }
//             if((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2])) {
//                 return cells[i][0];
//             }
//         }
//     }
//
//     /* return who win */
//     let winner = getWinner();
//     if(winner) {
//         if(winner === 'x') {
//             winnerMessage.innerHTML = 'X win the game!';
//         } else {
//             winnerMessage.innerHTML = 'O win the game!';
//         }
//     }
//
// });


