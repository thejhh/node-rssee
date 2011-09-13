/* MySQL backend tests */

var testCase = require('nodeunit').testCase,
	rssee = require('../lib/rssee.js'),
	sys = require('sys');

module.exports = testCase({
	setUp: function (callback) {
		var mt = this;
		//mt.memory = new HashMemory();
		callback();
	},
	tearDown: function (callback) {
		var mt = this;
		//delete mt.memory;
		callback();
	},
	/* Test basic API */
	"api": function(test){
		var mt = this;
		/*
		test.expect(4);
		test.ok(mt.memory);
		test.ok(mt.memory.save);
		test.strictEqual(typeof mt.memory.save, 'function');
		test.strictEqual(typeof mt.memory.check, 'function');
		*/
		test.done();
	},
	/* Test hashing strings */
	"strings": function(test){
		/*
		var mt = this,
		    obj = 'Hello World',
		    now = new Date();
		
		test.expect(3);
		
		test.strictEqual( mt.check(obj), undefined );
		test.ok( mt.save(obj) );
		test.ok( mt.check(obj) );
		*/
		test.done();
	}
});

/* EOF */
