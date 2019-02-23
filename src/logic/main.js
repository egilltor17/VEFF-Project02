// Project02/src/logic/main.js

function add(a, b) {
    return a + b;
}

function testClick(boxNr, cellNr) {
    var cell = "cell" + boxNr + cellNr;
    console.log(cell);
    document.getElementById(cell).style.backgroundColor = "black";
}
function generateBoard(){
    difficulty = document.getElementById('difficulty');
    SendSudokuRequest(difficulty.value);

}
function SendSudokuRequest(dif){
    //Prepare the parameter value for 'myParam'

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku/';

    let res;

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: dif })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            res = response;
            console.log("Success: ", response.data);
            // console.log(response);
            
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
            
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
             console.log(res.status);
             return res;
        });
}


if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { 
    module.exports = {
        add,
        testClick,
        SendSudokuRequest,
        generateBoard,
    } 
} else {
    // window.testClick = testClick;
}



