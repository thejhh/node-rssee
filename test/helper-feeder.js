
var RSS = require('rss');

/* lets create an rss feed */
var feed = new RSS({
	title: 'RSS feed tester',
	description: 'RSS feed for testing RSS feed readers',
	feed_url: 'http://example.com/rss.xml',
	site_url: 'http://example.com',
	image_url: 'http://example.com/icon.png',
	author: 'JHH'
});

/* Add test data into the feed periodically each second */
function start_feeding(limit, interval) {
	limit = limit || 4;
	interval = interval || 1;
	var guid = 0;
	var id = setInterval(function() {
		
		if(feed.items.length >= limit) {
			feed.items.shift();
		}
		
		guid += 1;
		feed.item({
		    title:  'Test item #'+guid,
		    description: 'use this for the content. It can include html.',
		    url: 'http://example.com/article4?this&that', // link to the item
		    guid: guid, // optional - defaults to url
		    author: 'Guest Author', // optional - defaults to feed author property
		    date: new Date() // any format that js Date can parse.
		});
	
	}, interval*1000);
	return id;
}

// 
var argv = require('optimist')
    .usage('Usage: $0 [--port N] [--host ADDR] [--limit N] [--interval SECS]')
    .demand([])
    .argv,
    http = require('http');

var http_port = argv.port || 8080,
    http_host = argv.host || "127.0.0.1",
    limit = argv.limit || 10,
    interval = argv.interval || 5;

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/rss+xml'});
	res.end(feed.xml());
}).listen(http_port, http_host);

start_feeding(limit, interval);

console.log('HTTP+RSS server running at http://'+http_host+':'+http_port+'/');

/* EOF */
