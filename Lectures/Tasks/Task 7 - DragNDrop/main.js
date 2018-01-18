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

