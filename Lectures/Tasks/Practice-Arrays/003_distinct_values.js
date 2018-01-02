/*
 * Distinct values:
 * Write a function that returns the distinct values of two arrays.
 *
 * Example:
 *        arr1 = [3, 4, 6, 3, 1],
 *        arr2 = [5, 10, 7, 1, 3, 9, 8, 7]
 *
 * should return [4, 6, 5, 10, 7, 9, 8]
 *
 * */

let arr1 = [3, 4, 6, 3, 1],
    arr2 = [5, 10, 7, 1, 3, 9, 8, 7];


function distinctValues(arr1, arr2) {
    let items = [],
        i,
        j;
    for(i = 0; i < arr1.length; i++) {
        if(!arr2.includes(arr1[i]) && !items.includes(arr1[i])) {
            items.push(arr1[i]);
        }
    }
    for(j = 0; i < arr2.length; j++) {
        if(!arr1.includes(arr2[j]) && !items.includes(arr2[j])) {
            items.push(arr2[j]);
        }
    }
    return items;
}