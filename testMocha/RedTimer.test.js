const requestAnimationFrame = require('raf').polyfill();
const expect = require('chai').expect;
const assert =require('chai').assert;
const RedTimer = require('../RedTimer');
const valueToText =require( "value-to-text");
const fs = require("fs");
const data = fs.readFileSync("./testMocha/RedTimer.run.js","utf8",function (err,data){console.log(err)});
console.log("data");
eval(data);