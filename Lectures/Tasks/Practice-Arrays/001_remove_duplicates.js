/*
* Remove duplicates:
* Write a function that removes duplicate values from an array.
*
* Example:
*        arr = [1, 3, 7, 1, 3, 9, 8, 7]
* should return:
*        [1, 3, 7, 9, 8]
*
* */

var arr = [1, 3, 7, 1, 3, 9, 8, 7];

function removeDuplicates(arr) {

}

function unique(arr) {
// your code
    return arr.filter(function(x, i) {
        return arr.indexOf(x) === i;
    })
}

/* best practice */
function unique(arr) {
    return arr.filter((x, i) => arr.indexOf(x) === i);
}
