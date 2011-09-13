/* Generic Hash Functions by @jheusala */

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
/*global Buffer: false, clearInterval: false, clearTimeout: false, console: false, global: false, module: false, process: false, querystring: false, require: false, setInterval: false, setTimeout: false, util: false, __filename: false, __dirname: false */

var crypto = require('crypto'),
    hash = module.exports = {};

/* Create hash */
hash.create = function createHash(str, algorithm, encoding) {
	var shasum = crypto.createHash(algorithm || 'sha1');
	shasum.update(str);
	return shasum.digest(encoding || 'hex');
};

/* Create sha1 hash */
hash.sha1 = function(str, encoding) {
	return hash.create(str, 'sha1', encoding || 'hex');
};

/* Create md5 hash */
hash.md5 = function(str, encoding) {
	return hash.create(str, 'md5', encoding || 'hex');
};

/* Create random hexadecimal token */
hash.createToken = function(chars) {
	return hash.md5(''+Math.random(0, 0x7fffffff)).substr(0, chars || 32);
};

/* EOF */
