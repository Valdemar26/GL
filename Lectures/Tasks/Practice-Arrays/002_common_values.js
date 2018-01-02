/*
 * Common values:
 * Write a function that returns the common values of two arrays.
 *
 * Example:
 *        arr1 = [3, 4, 6, 3, 1],
 *        arr2 = [5, 10, 7, 1, 3, 9, 8, 7]
 * should return:
 *        [3, 1]
 *
 * */

let arr1 = [3, 4, 6, 3, 1],
    arr2 = [5, 10, 7, 1, 3, 9, 8, 7];


function commonValues(arr1, arr2) {
    let i,
        items = [];
    for(i = 0; i < arr1.length; i++) {
        if(arr2.includes(i) && !items.includes(i)) {
            items.push(i)
        }
    }
    return items;
}