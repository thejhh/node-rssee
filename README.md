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

Dependencies
------------

This library is using [node-easyrss](https://github.com/drudge/node-easyrss) 
and [libxmljs](https://github.com/polotek/libxmljs) to parse ATOM/RSS feeds.

In addition to that you need to have `libxml2-dev` and `scons` in your system.

You can install these packages on Debian-based system with command:

	aptitude install scons libxml2-dev

Examples
--------

	var rss = require('rssee').create({'interval':300}),
	    sys = require('sys');
	
	rss.on('article', function(a) {
		console.log('new article received: ' + sys.inspect(a));
	});
	
	rss.start('http://localhost:8080/rss.xml');

