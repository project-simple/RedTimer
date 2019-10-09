const requestAnimationFrame = require('raf').polyfill();
const  performanceNow = require('performancenow');
global.performance =  {now : performanceNow};
const expect = require('chai').expect;
const assert =require('chai').assert;
const RedTimer = require('../dist/RedTimer.min.js');
const valueToText =require( "value-to-text");
const fs = require("fs");
const data = fs.readFileSync("./testMocha/RedTimer.run.js","utf8",function (err,data){console.log(err)});
console.log = function(){}
eval(data);