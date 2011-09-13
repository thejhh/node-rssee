Node RSS EventEmitter
=====================

Description
-----------

Simple evented RSS feed reader for Node.js.

Installation for Node.js
------------------------

Simplest way to install is to use [npm](http://npmjs.org/), just simply `npm install rssee`.

License
-------

MIT-style license, see [INSTALL.txt](http://github.com/jheusala/node-rssee/blob/master/LICENSE.txt).

Examples
--------

	var rss = require('../lib/rssee.js').create({'interval':300}),
	    sys = require('sys');
	
	rss.on('article', function(a) {
		console.log('new article received: ' + sys.inspect(a));
	});
	
	rss.start('http://localhost:8080/rss.xml');

