"use strict";
/*!
@author RedCamel / https://github.com/redcamel / webseon@gmail.com
MIT License
Copyright (c) 2019 ~ By RedCamel.
*/
;(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.RedTimer = factory());
}(this, (function () {
	var RedTimer;
	var timerMap = [];
	var k;
	var addItem, delItem;
	var tick;
	var update;
	update=function(time){
		this['_endTime'] = this['_startTime'] + this['_duration'];
		this['_elapsedTime'] = time - this['_startTime'];
		if(this['_elapsedTime']>this['_duration']) this['_elapsedTime'] = this['_duration']
		this['_remainTime'] = this['_endTime'] - time;
		if (this['_remainTime'] < 0) this['_remainTime'] = 0;
		if (this['_updateCallback']) this['_updateCallback'](this);
		if (this['_endTime'] < time) {
			//console.log('타이머종료', this['_key']);
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
				if (target) update.call(target,time)
			}
			requestAnimationFrame(tick);
		}
	})();
	requestAnimationFrame(tick);
	RedTimer = function (key, duration, updateCallback, endCallback) {
		if (!(this instanceof RedTimer)) return new RedTimer(key, duration, updateCallback, endCallback);
		//
		this['key'] = key;
		this['duration'] = duration;
		this['_startTime'] = performance.now();
		this['_elapsedTime'] = 0;
		this['_remainTime'] = this['_duration'];
		if(updateCallback == undefined || updateCallback instanceof Function) this['_updateCallback'] = updateCallback;
		else throw new Error('updateCallback allow only function. input value : ' + updateCallback);
		if(endCallback == undefined || endCallback instanceof Function) this['_endCallback'] = endCallback;
		else throw new Error('endCallback allow only function. input value : ' + endCallback);
		addItem(key, this);
	};
	Object.defineProperty(RedTimer.prototype, 'startTime', {get() {return this['_startTime']}})
	Object.defineProperty(RedTimer.prototype, 'endTime', {get() {return this['_endTime']}})
	Object.defineProperty(RedTimer.prototype, 'elapsedTime', {get() {return this['_elapsedTime']}})
	Object.defineProperty(RedTimer.prototype, 'remainTime', {get() {return this['_remainTime']}})
	Object.defineProperty(RedTimer.prototype, 'duration', {
		get() {
			return this['_duration']
		},
		set(v) {
			if (this['_duration']) {

			} else {
				if (typeof v != 'number' || isNaN(v)) throw new Error('duration allow only positive number. input value : ' + v);
				if (v <= 0) throw new Error('duration allow only positive number. input value : ' + v);
				this['_duration'] = v
			}
		}
	});
	Object.defineProperty(RedTimer.prototype, 'key', {
		get() {
			return this['_key']
		},
		set(v) {
			if (this['_key']) {
			} else {
				if (typeof v != 'string') throw new Error('key allow only sting. input value : ' + v);
				if (timerMap[v]) throw new Error('already defined key. input value : ' + v);
				this['_key'] = v
			}
		}
	});

	RedTimer.prototype['destroy'] = function () {
		//console.log('타이머파괴', this['_key']);
		delItem(this);
	};
	RedTimer.destroyAll = function () {
		timerMap = {};
	};
	Object.freeze(RedTimer);
	return RedTimer
})));
