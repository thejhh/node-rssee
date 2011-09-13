/* HashMemory for Node RSS EventEmitter by @jheusala */

/*
 * Copyright (C) 2011 by Jaakko-Heikki Heusala <jheusala@iki.fi>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to 
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 */

/* for node-lint */
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, __filename: false, __dirname: false */

var hash = require('./hash.js'),
    sys = require('sys');

/* Constructor */
var HashMemory = module.exports = function(options) {
	this._hashes = {};
	this._seq = 0;
};

/* Make object into hash */
function get_hash(obj) {
	return hash.sha1(sys.inspect(obj));
}

/* Saves an object to memory */
HashMemory.prototype.save = function(obj, time) {
	if(!time) {
		time = new Date();
	}
	var hash = get_hash(obj);
	if(this._hashes[hash] === undefined) {
		this._seq += 1;
		this._hashes[hash] = {'time':time, 'hash':hash, 'id':this._seq};
	} else {
		if(this._hashes[hash].time < time) {
			this._hashes[hash] = time;
		}
	}
	return this._hashes[hash];
};

/* If obj has been saved returns hash and [last seen] time otherwise undefined */
HashMemory.prototype.check = function(obj) {
	var hash = get_hash(obj);
	return this._hashes[hash];
};

/* EOF */
