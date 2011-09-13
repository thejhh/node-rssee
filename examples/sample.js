/* */

var rss = require('../lib/rssee.js').create({'interval':300}),
    sys = require('sys');

rss.on('article', function(a) {
	console.log('new article received: ' + sys.inspect(a));
});

rss.start('http://localhost:8080/rss.xml');

/* EOF */
