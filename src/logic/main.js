// Project02/src/logic/main.js

var res;

function add(a, b) {
    return a + b;
}

function testClick(boxNr, cellNr) {
    var cell = "cell" + boxNr + cellNr;
    console.log(cell);
}

async function generateBoard(){
    var difficulty = document.getElementById('difficulty').value;
    await SendSudokuRequest(difficulty);

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    
    console.log(res)
    fillBoard();
}

async function SendSudokuRequest(dif){
    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku/';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: dif })
        .then(function (response) {
            //When successful, print 'Success: ' and the received data
            res = response;
            // console.log("Success: ", response.data);
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
            // console.log(res.status);
            //return res;
        });
}
/*
    res:
      data:
        board:
          boxes: Array(9)
            0: (9) ["7", "9", "6", "5", "2", "1", "8", "3", "."]
            1: (9) ["2", "3", "4", "8", "9", "6", "7", "1", "5"]
            2: (9) [".", "8", ".", "3", "4", "7", "6", "2", "9"]
            3: (9) ["6", "1", "9", "3", "8", "7", "2", "4", "5"]
            4: (9) ["3", ".", "8", "5", "2", "1", "6", "7", "9"]
            5: (9) ["7", "5", "2", "4", "9", "6", ".", ".", "."]
            6: (9) ["1", ".", "8", ".", ".", ".", "9", "7", "3"]
            7: (9) ["9", "5", "3", "1", ".", "7", "4", ".", "2"]
            8: (9) ["2", ".", "4", "9", ".", ".", ".", ".", "."]
*/

function fillBoard() {
    if(checkResponse()) {
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++) {
                if(res.data.board.boxes[i][j] !== ".") {
                    cell = "cell" + (String)(i+1) + (String)(j+1);
                    document.getElementById(cell).value = (Number)(res.data.board.boxes[i][j]);
                    document.getElementById(cell).style.backgroundColor = "lightgray";
                    document.getElementById(cell).disabled = true;
                }
            }
        }
    } else {
        // ToDo: use generic board;
    }
}

function checkResponse() {
    if((typeof(res) !== "object") || (res.status !== 201)) {
        console.log("fail 1");
        return false;
    } else if(typeof(res.data) !== "object" || typeof(res.data.board) !== "object") {
        console.log("fail 2");
        return false;
    } else if(typeof(res.data.board.boxes) !== "object" || res.data.board.boxes.length !== 9) {
        console.log("fail 3");
        return false;
    } else {
        for(var i = 0; i < 9; i++) {
            if(typeof(res.data.board.boxes[i]) !== "object" || res.data.board.boxes[i].length !== 9) {
                console.log("fail 4," + i);
                return false;
            } 
        }
    }
    return true;
} 

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { 
    module.exports = {
        add,
        testClick,
        SendSudokuRequest,
        generateBoard,
        fillBoard,
        checkResponse,
    } 
} else {
    // window.testClick = testClick;
}



