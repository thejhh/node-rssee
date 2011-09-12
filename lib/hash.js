/* Hash Functions by @jheusala */

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
