var path = require('path');
var fs = require('fs');
var http = require('http');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

// Serve up our internal assets
exports.serveAssets = function(status, res, asset) {
  fs.readFile(archive.paths.siteAssets + '/' + asset, 'utf-8', function(err, data) {
    if (err) { throw err; }
    res.writeHead(status, exports.header);
    res.write(data);
    res.end();
  });
};

// Serve up sites that are archived
exports.scrape = function(url, callback) {
  http.get(url, function(response) {
    var rawHTML = '';

    response.on('data', function(chunk) {
      rawHTML += chunk;
    });
    response.on('end', function() {
      callback(rawHTML.toString());
    });
  });
};