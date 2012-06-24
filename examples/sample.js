/* */

var rss = require('../lib/rssee.js').create({'interval':15}),
    util = require('util');

rss.on('article', function(a) {
	console.log('new article received: ' + util.inspect(a));
});

rss.start('http://localhost:8080/rss.xml');

/* EOF */
