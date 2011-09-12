/* */

var rss = require('../lib/rssee.js')({'interval':15}),
    sys = require('sys');

rss.on('article', function(a) {
	console.log('new article received: ' + sys.inspect(a));
});

rss.start('http://forum.freeciv.fi/index.php?type=rss;action=.xml');

/* EOF */
