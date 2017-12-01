window.addEventListener('load', function() { // check if page is loaded

    var textarea = document.getElementById('textarea');
    var button = document.getElementById('btn');
    var words = document.querySelector('.words');
    var maximal = document.querySelector('.maximal');
    var minimum = document.querySelector('.minimum');
    var average = document.querySelector('.average');

    // make click event by press 'Enter' button
    textarea.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            button.click();
        }
    });

    button.addEventListener('click', function() {
        calculate();
    });

    // function for calculate max, min and average of words
    function calculate() {
        if(textarea.value == '') {
            return; // return null when textarea is empty
        } else {
            var arr = textarea.value.trim().split(/\s+/);
            var number = arr.length; // get number of words
            // get maximal and minimal word length
            var max = arr.reduce(function (a, b) { return a.length > b.length ? a : b; }).length;
            var min = arr.reduce(function (c, d) { return c.length < d.length ? c : d; }).length;
            maximal.innerHTML = 'Length of the maximal word: ' + '<' + max + '>';
            minimum.innerHTML = 'Length of the minimum word: ' + '<' + min + '>';
            words.innerHTML = 'Number of words: ' + '<' + number + '>';
            var count = 0;
            for (var i = 0, len = textarea.value.length; i < len; i++) {
                if (textarea.value[i] !== ' ') {
                    count++;
                }
            }
            var average_word = Math.round(count / number); // get average length of words
            average.innerHTML = 'Average length of words: ' + '<' + average_word + '>';
        }

    }
});
