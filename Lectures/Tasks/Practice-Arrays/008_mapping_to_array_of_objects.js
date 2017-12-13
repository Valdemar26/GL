/*
 * Mapping an array of strings to an array of objects:
 *
 * should return { name: 'John', age: <random age> }
 *
 * */

let array = ['John', 'Alex', 'Sofie', 'Karl', 'Rick'];



studentList.reduce(function(accumulator, value, index, studentList) {
    if (accumulator > value.age) {
        return accumulator
    } else {
        accumulator = value.age;
        return accumulator;
    }
}, 0);