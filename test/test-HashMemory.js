/* MySQL backend tests */

var testCase = require('nodeunit').testCase,
	HashMemory = require('../lib/HashMemory.js'),
	sys = require('sys');

function test_builder(expected_hash, obj) {
	return function(test){
		var mt = this,
		    time = new Date();
		
		time.setTime(1315873526*1000);
		
		test.expect(45);
		
		function test_obj(expected_hash, obj, expected_id) {
			test.ok( mt.memory.save(obj, time) );
			var results = mt.memory.check(obj);
			
			test.ok( results );
			
			test.strictEqual( typeof results, 'object' );
			test.strictEqual( typeof results.hash, 'string' );
			test.strictEqual( results.hash, expected_hash );
			
			test.strictEqual( typeof results.time, 'object' );
			test.strictEqual( results.time instanceof Date, true );
			test.strictEqual( results.time, time );
			test.strictEqual( results.time.getTime(), 1315873526*1000 );
			
			test.strictEqual( typeof results.id, 'number' );
			test.strictEqual( results.id, expected_id );
		}
		
		// Check that obj isn't seen already
		test.strictEqual( mt.memory.check(obj), undefined );
		
		// Test it now
		test_obj(expected_hash, obj, 1);
		
		// Test it again
		test_obj(expected_hash, obj, 1);
		
		// Test something else
		test_obj('30c6a74622db255460c71900a530869400aa1939', 'Hello World 2', 2);
		
		// Test something else, again
		test_obj('469a6dc34c2211a107c2d16d834a965b819aa9a9', 'Hello World 3', 3);
		
		test.done();
	};
}

module.exports = testCase({
	setUp: function (callback) {
		var mt = this;
		mt.memory = new HashMemory();
		callback();
	},
	tearDown: function (callback) {
		var mt = this;
		delete mt.memory;
		callback();
	},
	/* Test basic API */
	"api": function(test){
		var mt = this;
		test.expect(4);
		test.ok(mt.memory);
		test.ok(mt.memory.save);
		test.strictEqual(typeof mt.memory.save, 'function');
		test.strictEqual(typeof mt.memory.check, 'function');
		test.done();
	},
	/* Test hashing strings */
	"number": test_builder('7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 1234),
	"string": test_builder('d3be8a5f97cd9a52b903c8264dd4fb31c732f335', 'Hello World'),
	"object": test_builder('49b492c2f0c29b237b8fe400b1c14112e3e2da17', {'hello':'world','foo':1234}),
	"array": test_builder('68bdf8fcb6ca8de7760f86de3c3aab2bbfc06cc7', ['hello','world',1234])
});

/* EOF */
