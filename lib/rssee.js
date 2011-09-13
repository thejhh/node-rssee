/* Node RSS EventEmitter by @jheusala */

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

var EventEmitter = require('events').EventEmitter,
    rss = require('easyrss'),
    HashMemory = require('./HashMemory.js'),
    foreach = require('snippets').foreach,
    util = require('util'),
	lib = module.exports = {};

lib.HashMemory = HashMemory;

/* Main builder */
lib.create = function(options) {
	
	options = options || {};
	
	var settings = {},
	    emitter = new EventEmitter(),
	    memory = new HashMemory();
	
	emitter.settings = settings;
	settings.interval = options.interval || 300; // Default interval for polling is 5 minutes
	
	/* Perform the polling */
	function poll(first) {
		if(!settings.url) {
			console.log('Warning! settings.url was missing, could not poll.');
			return;
		}
		rss.parseURL(settings.url, function(posts){
			foreach(posts).each(function(post) {
				var guid = post.guid||post.link||post;
				if(first) {
					memory.save(guid, post.pubDate);
				} else {
					if(memory.check(guid) === undefined) {
						emitter.emit('article', post);
					}
					memory.save(guid, post.pubDate);
				}
			});
		});
	}
	
	/* Start polling this url */
	emitter.start = function(u) {
		if(settings.intervalId) {
			console.log('Warning! Emitter already polling!');
			return;
		}
		settings.url = ''+u;
		poll(true);
		settings.intervalId = setInterval(poll, settings.interval*1000);
	};
	
	/* Stop polling */
	emitter.stop = function() {
		if(!settings.intervalId) {
			console.log('Warning! Emitter was not polling!');
			return;
		}
		clearInterval(settings.intervalId);
		settings.intervalId = undefined;
	};
	
	return emitter;
};

/* EOF */
