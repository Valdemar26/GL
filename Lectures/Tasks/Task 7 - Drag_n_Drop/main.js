window.addEventListener('load', function(e) {
    console.log('loaded');
    let x = document.getElementById('x'),
        o = document.getElementById('o');
    // let x_o = document.getElementsByClassName('x-o');
    let winnerMessage = document.querySelector('.winnerMessage');
    let button = document.querySelector('.startNewGame');
    let cells = document.querySelectorAll('.cell');
    let field = document.getElementById('field');
    let nextMove = 'x';


    x.onmousedown =  function(e) {
        let coords = getCoords(x),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        // check if mouse pressed and prepare to moved
        x.style.position = 'absolute';
        moveAt(e);

        // move X or O in body
        document.body.appendChild(x);
        //field.appendChild(x);
        // cells.target.appendChild(x);

        // show X or O under another elements todo - check if it is necessary?
        x.style.zIndex = 1000;

        // move X or O under cursor
        function moveAt(e) {
            x.style.left = e.pageX - shiftX + 'px';
            x.style.top = e.pageY - shiftY + 'px';
        }

        // move on screen
        document.onmousemove = function(e) {
            moveAt(e);
        };

        // check when moving is finished
        x.onmouseup = function(e) {
            let target = e.target.parentNode.childNodes.currentTarget;
            console.log(e.target);
            //e.target.appendChild(document.getElementById('field'));
            // if(elem.classList.contains('cell')) {
            //     // adding image to cell
            //     let img = document.createElement("img");
            //     img.setAttribute("src", 'x.png');
            //     img.setAttribute("height", "140");
            //     img.setAttribute("width", "140");
            //     elem.appendChild(img);
            // }
            // let xxx = document.querySelectorAll('.cell');
            // let target = e.target;
            // if(target.tagName !== 'DIV') {
            //     return
            // } else {
            //     // let img = document.createElement("img");
            //     // img.setAttribute("src", 'x.png');
            //     // img.setAttribute("height", "140");
            //     // img.setAttribute("width", "140");
            //     // img.setAttribute('id', 'x');
            //     xxx.target.appendChild(o);
            // }

            // document.ondragenter = true;
            document.onmousemove = null;
            x.onmouseup = null;
            x.onmousedown = null; // stop moving
            generateNewX();
            // for(let i = 0; i < cells.length; i++) {
            //     cells[i].classList.remove('cell'); // remove class cell
            //     cells[i].classList.add('cell', 'x'); // add class cell and x
            // }
        };

        // prevent default browser drag-n-drop event
        x.ondragstart = function() {
            return false;
        };

    };

    /* same code for 'o' */
    o.onmousedown = function(e) {
        let coords = getCoords(o),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        // check if mouse pressed and prepare to moved
        o.style.position = 'absolute';
        moveAt(e);

        // move X or O in body
        document.body.appendChild(o);

        // show X or O under another elements todo - check if it is necessary?
        o.style.zIndex = 1000;

        // move X or O under cursor
        function moveAt(e) {
            o.style.left = e.pageX - shiftX + 'px';
            o.style.top = e.pageY - shiftY + 'px';
        }

        // move on screen
        document.onmousemove = function(e) {
            moveAt(e);
        };

        // check when moving is finished
        o.onmouseup = function(e) {
            // var xxx = e.clientX, yyy = e.clientY,
            //     elementMouseIsOver = document.elementFromPoint(xxx, yyy);
            //
            // elementMouseIsOver.className += ' хня';
            // alert(elementMouseIsOver);
            //cell.target.className += 'o'; // add class cell and o
            //cell.target.className += 'sukrrrrrrrrrr';
            console.log(e);
            document.onmousemove = null;
            o.onmouseup = null;
            o.onmousedown = null;
            // for(let i = 0; i < cells.length; i++) {
            //     cells[i].classList.remove('cell'); // remove class cell
            //     cells[i].classList.add('cell', 'x'); // add class cell and x
            // }
            generateNewO();
            console.log('stop moving');
        };

        // prevent default browser drag-n-drop event
        o.ondragstart = function() {
            return false;
        };

    };

    /* getCoords function */
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }

    /* generate new images */
    function generateNewX() {
        let er = document.getElementById('choose');
        let img = document.createElement("img");
        img.setAttribute("src", 'x.png');
        img.setAttribute("height", "140");
        img.setAttribute("width", "140");
        img.setAttribute('id', 'x');
        er.appendChild(img);
    }

    function generateNewO() {
        let er = document.getElementById('choose');
        let img = document.createElement("img");
        img.setAttribute("src", 'o.png');
        img.setAttribute("height", "140");
        img.setAttribute("width", "140");
        img.setAttribute('id', 'o');
        er.appendChild(img);
    }


    /* start new game */
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

    /* get winner function */
    function getWinner() {
        let cellsD = document.querySelectorAll('.cell'),
            cells = [[], [], []],
            i,
            j;
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3; j++) {
                let el = cellsD[i * 3 + j];
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

    /* return who win */
    let winner = getWinner();
    if(winner) {
        if(winner === 'x') {
            winnerMessage.innerHTML = 'X win the game!';
        } else {
            winnerMessage.innerHTML = 'O win the game!';
        }
    }

});


