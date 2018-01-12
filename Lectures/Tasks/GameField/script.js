let gameField = document.getElementById("game-field"),
    players = document.getElementById('players'),
    player1 = document.getElementById('player1'),
    player2 = document.getElementById('player2'),
    reload = document.getElementById("reload-btn"),
    size=3, allblocks, steps=0,
    dragObject = {};

/**
 *   Function that builds game field
 **/

window.onload = () => {
    for(let i=0; i<size*size; i++){
        gameField.innerHTML+="<div class='cellule'></div>";
    }
    allblocks = document.getElementsByClassName("cellule");
}

/**
 *   Drag 'n' Drop start
 **/

players.addEventListener('mousedown', (event) => {

    if(event.which !== 1)    //if right button or scroll is clicked
        return;
    if(event.target !== player1 && event.target !== player2){
        return;
    }
    if(event.target === player1 && steps%2 !== 0 || event.target === player2 && steps%2 !== 1)
        return;               //other player's turn

    //create copy of a node to move
    dragObject.el = event.target.cloneNode(true);
    dragObject.el.style.backgroundColor = 'transparent';
    dragObject.el.style.color = 'red';
    dragObject.posX = event.pageX;
    dragObject.posY = event.pageY;
});

/**
 *   Drag of an object
 **/

document.addEventListener('mousemove', (event) => {
    let changeX, changeY;

    if(!dragObject.el){       //if button is not clicked
        return;
    }
    changeX = event.pageX - dragObject.posX;
    changeY = event.pageY - dragObject.posY;
    if(Math.abs(changeX) < 5 && Math.abs(changeY) < 5)
        return;       //do nothing if element is moved not far
    document.body.appendChild(dragObject.el);
    dragObject.el.style.position = 'absolute';
    dragObject.posX = event.pageX - dragObject.el.offsetWidth / 2 + 'px';
    dragObject.posY = event.pageY - dragObject.el.offsetHeight / 2 + 'px';
    redrawElem();
})

/**
 *   Function which changes elements position on the screen
 **/

redrawElem = () => {
    dragObject.el.style.left = dragObject.posX;
    dragObject.el.style.top = dragObject.posY;
}

/**
 *   Function which checks if the game is finished
 *   @return {Number}  number of player which won or undefined
 **/

checkWinner = () => {
    let i;
    for(i=0; i<size; i++){
        if(allblocks[i*size].innerText === allblocks[i*size+1].innerText &&
            allblocks[i*size].innerText === allblocks[i*size+2].innerText ){
            if(allblocks[i*size].innerText === "X"){
                return 1;
            }
            if(allblocks[i*size].innerText === "0" ){
                return 2;
            }
        }
    }
    for(i=0; i<size; i++){
        if(allblocks[i].innerText === allblocks[size+i].innerText &&
            allblocks[i].innerText === allblocks[2*size+i].innerText ){
            if(allblocks[i].innerText === "X"){
                return 1;
            }
            if(allblocks[i].innerText === "0" ){
                return 2;
            }
        }
    }
    if(allblocks[0].innerText === allblocks[size*1+1].innerText &&
        allblocks[0].innerText === allblocks[size*2+2].innerText ){
        if(allblocks[0].innerText === "X"){
            return 1;
        }
        if(allblocks[0].innerText === "0" ){
            return 2;
        }
    }
    if(allblocks[size-1].innerText === allblocks[size+size-2].innerText &&
        allblocks[size-1].innerText === allblocks[size*3-3].innerText ){
        if(allblocks[size-1].innerText === "X"){
            return 1;
        }
        if(allblocks[size-1].innerText === "0" ){
            return 2;
        }
    }
}

/**
 *   Drop of an element to the new position or rollback
 **/

document.addEventListener('mouseup', (event) => {
    let elem;
    if(event.which != 1)    //if right button or scroll is clicked
        return;
    if(!dragObject.el)
        return;
    dragObject.el.style.visibility = 'hidden';
    elem = document.elementFromPoint(event.clientX, event.clientY);
    if(elem.innerHTML === ''){
        elem.innerHTML = dragObject.el.innerHTML;
        steps++;
    }
    dragObject.el.style.visibility = 'visible';
    document.body.removeChild(dragObject.el);
    dragObject.el = false;
    if(steps>=5){
        let res = checkWinner();
        if(res === 1){
            reload.style.visibility = "visible";
            alert('Player 1 won');
        } else {
            if(res === 2){
                reload.style.visibility = "visible";
                alert('Player 2 won');
            } else if(steps === 9){
                reload.style.visibility = "visible";
                alert('Draw');
            }
        }
    }
})

/**
 *   Function which clears the field to start new game
 **/

reload.addEventListener('click', () => {
    for(let i=0; i<allblocks.length; i++){
        allblocks[i].innerHTML = '';
    }
    steps = 0;
    reload.style.visibility = "hidden";
})
