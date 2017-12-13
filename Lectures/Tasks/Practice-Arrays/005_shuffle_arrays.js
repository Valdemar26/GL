/*
 * Shuffle arrays:
 * Write a function that removes duplicate values from an array.
 *
 * Example:
 *        arr1 = [11, 12],
 *        arr1 = [21, 22, 23, 24]
 * should return:
 *        [11, 21, 12, 22, 23, 24]
 *
 * */

var arr = [1, 3, 7, 1, 3, 9, 8, 7];

function shuffle(arr1, arr2) {

}

/*
* Solution from classroom
* */
function compountArray(a, b) {
    let a = [11, 12],
        b = [21, 22, 23, 24],
        arr_a = a.slice(),
        arr_b = b.slice(),
        arr = [];

    while(arr_a.length || arr_b.length) {
        if(arr_a.length) {
            arr.push(arr_a.shift())
        }

        if(arr_b.length) {
            arr.push(arr_b.shift())
        }
    }

    return arr;
}