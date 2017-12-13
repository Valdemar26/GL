/*
 * Return most repeatable value from array:
 *
 * arr = [4, 2, 3, 0, 4, 6, 3, 0, 4, 9, 4]; // should return 4
 *
 * */

let arr = [4, 2, 3, 0, 4, 6, 3, 0, 4, 9, 4];



arr.reduce(function(accumulator, value, i, arr) {
    let counter = arr.filter( v => v === value).length;
    if (counter > accumulator.counter) {
        accumulator.value = value;
        accumulator.counter = counter;
    }
    return accumulator;
}, {value: 0, counter: 0});
