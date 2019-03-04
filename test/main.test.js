// Project02/tests/main.test.js

const axios = require("axios");
const chai = require("chai");
const main = require("../src/logic/main.js");

describe('generateBoard()', () => {
    
});

describe('sendSudokuRequest()', () => {
    
});

describe('fillBoard()', () => {
    
});

describe('checkResponse()', () => {
    it('should return false when res != object', () => {
        chai.expect(main.checkResponse(undefined)).to.be.false;
    });
    
    it('should return false when res.status != 201', () => {
        chai.expect(main.checkResponse({ status: 201 })).to.be.false;
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
    
    it('should return false when res.data.board.boxes[n].length != 9', () => {
        chai.expect(main.checkResponse({ data: { board: { boxes: [{}, {}, {}, {}, {}, {}, {}, {}, {}] } } })).to.be.false;
    });
    
    it('should return true when res is valid', () => {
        chai.expect(main.checkResponse({ status: 201, data: { board: { boxes: [["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."], 
                                                                               ["7", "9", "6", "5", "2", "1", "8", "3", "."]] } } })).to.be.true;
    });
});

describe("isInteger()", () => {

    it("should return true when integer is passed", () => {
        chai.expect(main.isInteger('4')).to.be.true;
        chai.expect(main.isInteger(1)).to.be.true;
        chai.expect(main.isInteger('10e4')).to.be.true;
    });
    
    it("should return false when non integer is passed", () => {
        chai.expect(main.isInteger('s')).to.be.false;
        chai.expect(main.isInteger(NaN)).to.be.false;
        chai.expect(main.isInteger(9.34)).to.be.false;
    });
});