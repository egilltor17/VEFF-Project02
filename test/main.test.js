// Project02/tests/main.test.js

const chai = require("chai");
const main = require("../src/logic/main");
// import { expect } from chai;
// import {add} from "../src/logic/main" ;

describe('dummy tests', () => {
    it('add', () => {
        chai.expect(main.add(4, 5)).to.equal(9);
    });
});