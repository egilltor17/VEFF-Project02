// Project02/src/logic/main.js

function add(a, b) {
    return a + b;
}

function testClick(boxNr, cellNr) {
    var cell = "cell" + boxNr + cellNr;
    console.log(cell);
    document.getElementById(cell).style.backgroundColor = "black";
}


if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { 
    module.exports = {
        add,
        testClick,
    } 
} else {
    // window.testClick = testClick;
}