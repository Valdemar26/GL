/*
 * Return object with oldest student:
 *
 * */

let studentList = [
    { name: 'Alex', age: '19'},
    { name: 'Bill', age: '23'},
    { name: 'Elvis', age: '33'},
    { name: 'Fox', age: '25'},
    { name: 'Jacob', age: '22'}
];



studentList.reduce(function(accumulator, value, index, studentList) {
   if (accumulator > value.age) {
       return accumulator
   } else {
       accumulator = value.age;
       return accumulator;
   }
}, 0);