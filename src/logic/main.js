// Project02/src/logic/main.js

function add(a, b) {
    return a + b;
}

function testClick(boxNr, cellNr) {
    var cell = "cell" + boxNr + cellNr;
    console.log(cell);
    document.getElementById(cell).style.backgroundColor = "black";
}
function sendAjaxRequest(){
    //Prepare the parameter value for 'myParam'
    var paramValue = document.getElementById('difficulty').value;

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku/';

    var res;

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: paramValue })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            res = response;
            console.log("Success: ", response.data);
            console.log(response);
            
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
        sendAjaxRequest,
    } 
} else {
    // window.testClick = testClick;
}



