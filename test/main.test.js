// Project02/tests/main.test.js

const chai = require("chai");
const main = require("../src/logic/main");

describe('generateBoard()', () => {
    it('add', () => {
        chai.expect(main.add(4, 5)).to.equal(9);
    });
});

describe('sendSudokuRequest()', () => {
    it('add', () => {
        chai.expect(main.add(4, 5)).to.equal(9);
    });
});

describe('fillBoard()', () => {
    /*
    it('should return false if responce is valid', () => {
        var res = { data: { board: { boxes: [["7", "9", "6", "5", "2", "1", "8", "3", "."],  
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."],
                                            ["7", "9", "6", "5", "2", "1", "8", "3", "."]] 
                                  } }, status: 201 }
        chai.expect(main.fillBoard()).to.be.true;
    });
    */
    it('should return false if responce is bad', () => {
        var res = {};
        chai.expect(main.fillBoard()).to.be.false;
    });
});

describe('checkResponse()', () => {
    it('should return false when res != object', () => {
        chai.expect(main.checkResponse(undefined)).to.be.false;
    });
    
    it('should return false when res.status != 201', () => {
        chai.expect(main.checkResponse({ status: 201})).to.be.false;
    });
    
    it('should return false when res.data != object', () => {
        chai.expect(main.checkResponse({ data: undefined})).to.be.false;
    });
    
    it('should return false when res.data.board != object', () => {
        chai.expect(main.checkResponse({ data: { board: "no board here" } })).to.be.false;
    });
    
    it('should return false when res.data.board.boxes != object', () => {
        chai.expect(main.checkResponse({ data: { board: { boxes: 66 } } })).to.be.false;
    });
    
    it('should return false when res.data.board.boxes.length != 9', () => {
        chai.expect(main.checkResponse({ data: { board: { boxes: ["7", "9", "6", "5", "2", "1", "8", "3", "."] } } })).to.be.false;
    });
    
    it('should return false when res.data.board.boxes[n] != object', () => {
        chai.expect(main.checkResponse({ data: { board: { boxes: ["7", "9", "6", "5", "2", "1", "8", "3", "."] } } })).to.be.false;
    });
    
    it('should return false when res.data.board.boxes[n].length != object', () => {
        chai.expect(main.checkResponse({ data: { board: { boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}] } } })).to.be.false;
    });
});