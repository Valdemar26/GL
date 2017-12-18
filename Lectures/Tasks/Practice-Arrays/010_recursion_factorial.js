/*
 * Recursion function to find factorial n!
 *
 * */

const factorial = function(n) {
    if(n === 1) {
        return n;
    } else {
        return n * factorial(n-1);
    }
};

const answer = factorial(3);// return 6   (3*2*1=6)
