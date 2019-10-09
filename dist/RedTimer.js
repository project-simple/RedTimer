(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RedTimer", [], factory);
	else if(typeof exports === 'object')
		exports["RedTimer"] = factory();
	else
		root["RedTimer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/RedTimer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/RedTimer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/*!
@author RedCamel / https://github.com/redcamel / webseon@gmail.com
MIT License
Copyright (c) 2019 ~ By RedCamel.
*/
var timerMap = [];
var k;
var addItem, delItem;
var tick;
var update;
update = function (time) {
	this['_endTime'] = this['_startTime'] + this['_duration'];
	this['_elapsedTime'] = time - this['_startTime'];
	if (this['_elapsedTime'] > this['_duration']) this['_elapsedTime'] = this['_duration']
	this['_remainTime'] = this['_endTime'] - time;
	if (this['_remainTime'] < 0) this['_remainTime'] = 0;
	if (this['_updateCallback']) this['_updateCallback'](this);
	if (this['_endTime'] < time) {
		console.log('timerEnd', this['_key']);
		this['destroy']();
		if (this['_endCallback']) this['_endCallback'](this);
	}
}
addItem = function (key, target) {
	timerMap[key] = target;
};
delItem = function (target) {
	delete timerMap[target._key];
};
tick = (function () {
	var target;
	return function (time) {
		for (k in timerMap) {
			target = timerMap[k];
			if (target) update.call(target, time)
		}
		requestAnimationFrame(tick);
	}
})();
requestAnimationFrame(tick);
function RedTimer(key, duration, updateCallback, endCallback) {
	if (!(this instanceof RedTimer)) return new RedTimer(key, duration, updateCallback, endCallback);
	//
	this['key'] = key;
	this['duration'] = duration;
	this['_startTime'] = performance.now();
	this['_elapsedTime'] = 0;
	this['_remainTime'] = this['_duration'];
	if (updateCallback == undefined || updateCallback instanceof Function) this['_updateCallback'] = updateCallback;
	else throw new Error('updateCallback allow only function. input value : ' + updateCallback);
	if (endCallback == undefined || endCallback instanceof Function) this['_endCallback'] = endCallback;
	else throw new Error('endCallback allow only function. input value : ' + endCallback);
	addItem(key, this);
};
Object.defineProperty(RedTimer.prototype, 'startTime', {
	get:function() {
		return this['_startTime']
	}
})
Object.defineProperty(RedTimer.prototype, 'endTime', {
	get:function() {
		return this['_endTime']
	}
})
Object.defineProperty(RedTimer.prototype, 'elapsedTime', {
	get:function() {
		return this['_elapsedTime']
	}
})
Object.defineProperty(RedTimer.prototype, 'remainTime', {
	get:function() {
		return this['_remainTime']
	}
})
Object.defineProperty(RedTimer.prototype, 'duration', {
	get:function() {
		return this['_duration']
	},
	set:function(v) {
		if (this['_duration']) {
		} else {
			if (typeof v != 'number' || isNaN(v)) throw new Error('duration allow only positive number. input value : ' + v);
			if (v <= 0) throw new Error('duration allow only positive number. input value : ' + v);
			this['_duration'] = v
		}
	}
});
Object.defineProperty(RedTimer.prototype, 'key', {
	get:function() {
		return this['_key']
	},
	set:function(v) {
		if (this['_key']) {
		} else {
			if (typeof v != 'string') throw new Error('key allow only sting. input value : ' + v);
			if (timerMap[v]) throw new Error('already defined key. input value : ' + v);
			this['_key'] = v
		}
	}
});
RedTimer.prototype['destroy'] = function () {
	console.log('destroyed timer', this['_key']);
	delItem(this);
};
RedTimer.destroyAll = function () {
	timerMap = {};
};
/* harmony default export */ __webpack_exports__["default"] = (RedTimer);

/***/ })

/******/ })["default"];
});