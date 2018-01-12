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


let cross  = document.createElement("img"),
    circle = document.createElement("img"),
    field  = document.getElementById("field"),
    cells  = document.getElementsByClassName("cell"),
    originalCross  = document.getElementById("cross"),
    originalCircle = document.getElementById("circle"),
    step = 1;

//  CROSS SETTINGS

cross.setAttribute("src", "x.png");
cross.setAttribute("alt", "cross");
cross.classList.add("cross");

originalCross.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

/**
 * Drag'N'Drop for a cross element
 */
originalCross.addEventListener("mousedown", (e) => {

    // The cross is placed only on unpaired passages and еhe maximum number of moves is 9
    if(step % 2 === 0 || step > 9) {
        return;
    }

    let coords   = getCoords(originalCross),
        shiftX   = e.pageX - coords.left,
        shiftY   = e.pageY - coords.top,
        newCross = cross.cloneNode(true); // avatar of original cross

    newCross.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // the avatar is displayed above the other elements
    newCross.style.position = 'absolute';
    newCross.style.zIndex = 1000;

    document.body.appendChild(newCross);
    moveAt(e, newCross, shiftX, shiftY);

    document.onmousemove = e => {
        moveAt(e, newCross, shiftX, shiftY);
    };

    newCross.onmouseup = e => {
        document.onmousemove = null;
        newCross.onmouseup = null;
        findPlace(newCross, e.pageY, e.pageX);
        newCross.remove(); // delete avatar
        step++;
    };
});

//  CIRCLE SETTINGS

circle.setAttribute("src", "o.png");
circle.setAttribute("alt", "circle");
circle.classList.add("circle");

originalCircle.addEventListener("dragstart", (e) => {
    e.preventDefault();
});

/**
 * Drag'N'Drop for a circle element
 */
originalCircle.addEventListener("mousedown", (e) => {

    // The circle is placed only on paired passages and еhe maximum number of moves is 9
    if(step % 2 !== 0 || step > 9) {
        return;
    }

    let coords   = getCoords(originalCircle),
        shiftX   = e.pageX - coords.left,
        shiftY   = e.pageY - coords.top,
        newCircle = circle.cloneNode(true); // avatar of original circle

    newCircle.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

    // the avatar is displayed above the other elements
    newCircle.style.position = 'absolute';
    newCircle.style.zIndex = 1000;

    document.body.appendChild(newCircle);
    moveAt(e, newCircle, shiftX, shiftY);

    document.onmousemove = e => {
        moveAt(e, newCircle, shiftX, shiftY);
    };

    newCircle.onmouseup = e => {
        document.onmousemove = null;
        newCircle.onmouseup = null;
        findPlace(newCircle, e.pageY, e.pageX);
        newCircle.remove(); // delete avatar
        step++;
    };
});

// COMMON METHODS

/**
 * Сalculate the correct position relative to the coordinates of the cursor
 *
 * @param {object} elem
 * @returns {object}
 */
function getCoords(elem) {
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

    /**
     * If the cell is empty, it places the element in it
     *
     * @param {number} cellNumber
     * @param {object} elem
     */
    function placeElement(cellNumber, elem) {
        if (cells[cellNumber].children.length > 0) {
            return;
        } else {
            cells[cellNumber].appendChild(elem);
        }
    }
}