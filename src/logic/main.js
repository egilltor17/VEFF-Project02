// Project02/src/logic/main.js

function add(a, b) {
    return a + b;
}

function testClick(rowNr, colNr) {
    var row = "row" + toString(rowNr);
    var col = "col" + toString(colNr);
    document.getElementsByClassName(row)
    // test[0].innerText = "Test";
    // for(var i = 0; i < test.length; i++) {
    //     console.log(test[i]);
    //     test[i].style.font-size = "2rem";
    // }

}

module.exports = {
    add,
    testClick,
} 
