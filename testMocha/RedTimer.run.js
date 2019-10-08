describe('Test key - RedTimer(key, duration, updateCallback, endCallback)', function () {
	describe('Test Constructor', function () {
		beforeEach(function () {
			RedTimer.destroyAll();
		});
		it('test - Constructor', function () {
			expect(
				new RedTimer('TestKey', 1000, function () {
				}, function () {
				})
			).to.be.an.instanceOf(RedTimer);
		});
		it('test - Constructor', function () {
			expect(
				RedTimer('TestKey', 1000, function () {
				}, function () {
				})
			).to.be.an.instanceOf(RedTimer);
		});
	});
	describe('Test key - allow only String', function () {
		beforeEach(function () {
			RedTimer.destroyAll();
		});
		it('test key', function () {
			expect(
				new RedTimer('TestKey', 1000, function () {
				}, function () {
				})
			).to.be.an.instanceOf(RedTimer);
		});
		[1, true, false, null, NaN, undefined, function () {
		}, [], {a: 1}].forEach(function (v) {
			it('test - RedTimer( ' + valueToText(v) + ' , 1000, function () {}, function () {} )', function () {
				var result = true
				try {
					new RedTimer(v, 1000, function () {
					}, function () {
					})
				} catch (e) {
					// console.log(e)
					result = false
				}
				expect(result).to.be.false;
			});
		})
	});
	describe('Test key - redefine', function () {
		it('test - redefine', function () {
			let result = true;
			RedTimer('TestKey', 1000, function () {
			}, function () {
			})
			try {
				RedTimer('TestKey', 1000, function () {
				}, function () {
				})
			} catch (e) {
				// console.log(e);
				result = false
			}
			expect(result).to.be.false;
		})
	})
});
describe('Test duration - RedTimer(key, duration, updateCallback, endCallback)', function () {
	beforeEach(function () {
		RedTimer.destroyAll();
	});
	it('test duration', function () {
		expect(
			new RedTimer('TestKey', 1000, function () {
			}, function () {
			})
		).to.be.an.instanceOf(RedTimer);
	});
	['string', true, false, null, NaN, undefined, function () {
	}, [], {a: 1}, 0, -1].forEach(function (v) {
		it('test - RedTimer( TestKey, ' + valueToText(v) + ', function () {}, function () {} )', function () {
			var result = true
			try {
				new RedTimer('TestKey', v, function () {
				}, function () {
				})
			} catch (e) {
				console.log(e)
				result = false
			}
			expect(result).to.be.false;
		});
	})
});
describe('Test updateCallback - RedTimer(key, duration, updateCallback, endCallback)', function () {
	beforeEach(function () {
		RedTimer.destroyAll();
	});
	[null, undefined, function () {
	}].forEach(function (v) {
		it('test updateCallback - RedTimer( TestKey, 1000, ' + valueToText(v) + ', function () {} )', function () {
			expect(
				new RedTimer('TestKey', 1000, v, function () {
				})
			).to.be.an.instanceOf(RedTimer);
		});
	});
	['string', true, false, NaN, [], {a: 1}, 0, -1].forEach(function (v) {
		it('test updateCallback - RedTimer( TestKey, 1000, ' + valueToText(v) + ', function () {} )', function () {
			var result = true
			try {
				new RedTimer('TestKey', 1000, v, function () {
				})
			} catch (e) {
				console.log(e)
				result = false
			}
			expect(result).to.be.false;
		});
	})
});
describe('Test endCallback - RedTimer(key, duration, updateCallback, endCallback)', function () {
	beforeEach(function () {
		RedTimer.destroyAll();
	});
	[null, undefined, function () {
	}].forEach(function (v) {
		it('test endCallback - RedTimer( TestKey, 1000, function () {}, ' + valueToText(v) + ' )', function () {
			expect(
				new RedTimer('TestKey', 1000, function () {
				}, v)
			).to.be.an.instanceOf(RedTimer);
		});
	});
	['string', true, false, NaN, [], {a: 1}, 0, -1].forEach(function (v) {
		it('test endCallback - RedTimer( TestKey, 1000, function () {}, ' + valueToText(v) + ' )', function () {
			var result = true
			try {
				new RedTimer('TestKey', 1000, function () {
				}, v)
			} catch (e) {
				console.log(e)
				result = false
			}
			expect(result).to.be.false;
		});
	})
});
describe('Test updateCallback/endCallback - RedTimer(key, duration, updateCallback, endCallback)', function () {
	it('test updateCallback - RedTimer( TestKey, 1000, function () {}, function () {} )', function () {
		var i = 0
		new RedTimer('updateCallbackTest', 1000, function () {
			i++
		}, function () {
		})
		setTimeout(function () {
			console.log(i)
			expect(i > 0).to.be.true;
		}, 100)
	});
	it('test endCallback - RedTimer( TestKey, 1000, function () {}, function () {} )', function () {
		var i = 0
		new RedTimer('endCallbackTest', 1000, function () {
				console.log(i++, 'update')
			}, function () {
				console.log(i, '종료')
				expect(true).to.be.true
			}
		)
	});
});
describe('Test duration/elapsedTime/endTime - RedTimer(key, duration, updateCallback, endCallback)', function () {
	it('test duration - RedTimer( TestKey_duration, 1000, function () {}, function () {} )', function () {
		var testTimer = new RedTimer('TestKey_duration', 1000, function () {
		}, function () {
		})
		console.log(testTimer.duration)
		expect(testTimer.duration == 1000).to.be.true;
	});
	it('test elapsedTime - RedTimer( TestKey_elapsedTime, 1000, function () {}, function () {} )', function () {
		var testTimer = new RedTimer('TestKey_elapsedTime', 1000, function () {
		}, function () {
		})
		setTimeout(function () {
			console.log(testTimer.elapsedTime)
			expect(testTimer.elapsedTime > 0).to.be.true;
		}, 100)
	});
	it('test elapsedTime - RedTimer( TestKey_elapsedTime2, 1000, function () {}, function () {} )', function () {
		var testTimer = new RedTimer('TestKey_elapsedTime2', 1000, function () {
		}, function () {
		})
		console.log(testTimer.elapsedTime)
		expect(testTimer.elapsedTime == 0).to.be.true;
	});
	it('test endTime - RedTimer( TestKey_endTime, 1000, function () {}, function () {} )', function () {
		var testTimer = new RedTimer('TestKey_endTime', 1000, function () {
		}, function () {
		})
		setTimeout(function () {
			console.log('endTime',testTimer.endTime)
			expect(testTimer.endTime == testTimer.startTime + testTimer.duration).to.be.true;
		},100)
	});
})