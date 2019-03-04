// Project02/src/logic/main.js

const pastelRed = '#ffc0c0';
const pastelYellow = '#fffedd';

function add(a, b) { //function to check whether the tests are working
    return a + b;
}

async function generateBoard(){
    var difficulty = document.getElementById('difficultySelector').value;
    clearBoard();
    document.getElementById("resultMSG").innerText = ""
    await sendSudokuRequest(difficulty);
    
}

async function sendSudokuRequest(dif){
    var responce;
    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku/';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: dif })
        .then((res) => {
            responce = res;
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            fillBoard(responce);
        });
}


function clearBoard() {
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++) {
            cell = "cell" + (String)(i+1) + (String)(j+1);
            document.getElementById(cell).value = "";
            document.getElementById(cell).style.background = "none";
            document.getElementById(cell).disabled = false;
        }
    }
}

function fillBoard(responce) { // fill the board with 
    var boxes;
    var sudokuId;
    if(checkResponse(responce)) {
        boxes = responce.data.board.boxes;
        sudokuId = responce.data.board._id;
    } else { // Set default boards to generate when server is down
        var difficulty = document.getElementById('difficultySelector').value;
        if(difficulty === "easy") {
            boxes = [["5", "6", "4", ".", ".", "3", "2", ".", "1"], 
                     ["8", "7", "2", ".", "1", ".", "3", "9", "."], 
                     ["3", "9", "1", ".", ".", ".", ".", ".", "5"],
                     ["4", "2", "9", "6", "5", "7", "3", "1", "8"],
                     [".", ".", "8", "2", "3", "1", "9", "4", "7"],
                     ["7", "1", "3", "8", "4", "9", "5", "2", "6"],
                     [".", ".", "6", ".", "3", "5", "8", "4", "2"],
                     ["4", "2", "3", "7", "8", "9", "1", ".", "."],
                     [".", "5", "8", "2", "6", "4", "9", "3", "7"]];
            sudokuId = -1;
        } else if(difficulty === "medium") {
            boxes = [["8", "7", ".", ".", "4", ".", "6", "2", "5"], 
                     ["4", "5", ".", ".", "2", ".", ".", "1", "."], 
                     ["2", "1", ".", "8", "5", ".", ".", "9", "."],
                     ["7", "6", ".", "5", ".", "4", ".", "8", "."],
                     ["9", "3", "1", "8", "6", "2", "5", ".", "7"],
                     ["5", "4", "8", "3", ".", "1", "9", "6", "2"],
                     ["2", ".", "7", "9", "5", "8", "4", ".", "6"],
                     [".", "9", "4", "6", "7", "3", "2", ".", "5"],
                     [".", ".", "5", "1", ".", "4", ".", ".", "."]];
            sudokuId = -1;
        } else if(difficulty === "hard") {
            boxes = [["4", ".", ".", "9", ".", ".", ".", ".", "."], 
                     [".", ".", ".", ".", "4", ".", ".", ".", "."], 
                     ["5", "3", "9", "6", ".", "1", "7", ".", "4"],
                     [".", "9", "6", ".", "4", "7", ".", ".", "."],
                     [".", "7", "8", "5", ".", "2", "1", "9", "6"],
                     ["2", "5", "3", "9", "1", "6", "8", "4", "7"],
                     [".", ".", "1", ".", "8", "4", "2", ".", "."],
                     [".", "8", ".", ".", ".", ".", ".", "5", "4"],
                     ["4", ".", "2", "3", ".", "5", "1", "7", "8"]];
            sudokuId = -1;
        }
    }
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++) {
            if(boxes[i][j] !== ".") {
                cell = "cell" + (String)(i+1) + (String)(j+1);
                document.getElementById(cell).value = (Number)(boxes[i][j]);
                document.getElementById(cell).style.backgroundColor = "lightgray";
                document.getElementById(cell).disabled = true;
            }
        }
    }
    document.getElementById("sudokuId").innerText = sudokuId;
}

function checkResponse(response) {
    if((typeof(response) !== "object") || (response.status !== 201)) {
        return false;
    } else if(typeof(response.data) !== "object" || typeof(response.data.board) !== "object") {
        return false;
    } else if(typeof(response.data.board.boxes) !== "object" || response.data.board.boxes.length !== 9) {
        return false;
    } else {
        for(var i = 0; i < 9; i++) {
            if(typeof(response.data.board.boxes[i]) !== "object" || response.data.board.boxes[i].length !== 9) {
                return false;
            } 
        }
    }
    return true;
} 

function resetColor(){ //reset colours with timeout after validate
    setTimeout(function background() {
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++) {
                cell = "cell" + (String)(i+1) + (String)(j+1);
                if(!document.getElementById(cell).disabled) {
                    document.getElementById(cell).style.background = "none";
                }
            }
        }
    },5000);
}

function isInteger(value) { //Check if tile value is a valid integer
    var isAnInteger = value % 2;
    if(isAnInteger != 0 && isAnInteger != 1){
        isAnInteger = false;
    }
    else {
        isAnInteger = true;
    }
    return isAnInteger
}

function validateBoard() { // Check board for all rules
    var valid = true;
    for(var i = 0; i < 9; i++) {          // All blocks, rows or columns
        for(var j = 0; j < 9; j++) {        // All cells
            var boxElementA = document.getElementById("cell" + (String)(i+1) + (String)(j+1));
            var rowElementA = document.getElementById("cell" + (String)(Math.floor((j+3)/3) + 3*Math.floor(i/3)) + (String)(3*(i%3) + j%3 + 1));
            var colElementA = document.getElementById("cell" + (String)(Math.floor((i+3)/3) + 3*Math.floor(j/3)) + (String)(3*(j%3) + i%3 + 1));
            if(!boxElementA.disabled  && (!isInteger(boxElementA.value) || boxElementA.value < 1 || 9 < boxElementA.value)) {
                if(boxElementA.value === "") {
                    boxElementA.style.backgroundColor = pastelYellow;
                } else {
                    boxElementA.style.backgroundColor = pastelRed;
                }
                valid = false;
            }
            
            for(var k = j+1; k < 9; k++) {    // Compared to all other cells
                var boxElementB = document.getElementById("cell" + (String)(i+1) + (String)(k+1));    
                var rowElementB = document.getElementById("cell" + (String)(Math.floor((k+3)/3) + 3*Math.floor(i/3)) + (String)(3*(i%3) + k%3 + 1));
                var colElementB = document.getElementById("cell" + (String)(Math.floor((i+3)/3) + 3*Math.floor(k/3)) + (String)(3*(k%3) + i%3 + 1));
                
                if(boxElementA.value !== "" && boxElementA.value === boxElementB.value) {
                    if(!boxElementA.disabled) { boxElementA.style.backgroundColor = pastelRed; }
                    if(!boxElementB.disabled) { boxElementB.style.backgroundColor = pastelRed; }
                    valid = false;
                }
                if(rowElementA.value !== "" && rowElementA.value === rowElementB.value) {
                    if(!rowElementA.disabled) { rowElementA.style.backgroundColor = pastelRed; }
                    if(!rowElementB.disabled) { rowElementB.style.backgroundColor = pastelRed; }
                    valid = false;
                }
                if(colElementA.value !== "" && colElementA.value === colElementB.value) {
                    if(!colElementA.disabled) { colElementA.style.backgroundColor = pastelRed; }
                    if(!colElementB.disabled) { colElementB.style.backgroundColor = pastelRed; }
                    valid = false;
                }
            }
        }
    }
    resetColor();
    if(valid){
        document.getElementById('resultMSG').innerText = "success";
    }
    else{
        document.getElementById('resultMSG').innerText = "incorrect";
    }

    return valid;
}


if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { 
    module.exports = {
        add,
        sendSudokuRequest,
        generateBoard,
        clearBoard,
        fillBoard,
        checkResponse,
        validateBoard,
        resetColor,
        isInteger,
    } 
}