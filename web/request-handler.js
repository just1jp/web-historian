var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');


var header = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'content-type': 'text/html'
};

var statusCode = 200;

var requestType = {
  'GET': function(req, res) {
    // Retrieve and render index.html for the client
    archive.readListOfUrls();
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', function(err, data) {
      if (err) {
        console.log('Error', err);
      }
      res.writeHead(statusCode, header);
      res.write(data);
      res.end();
    });
  },
  'POST': function(req, res) {

    req.on('data', function(data) {
      //console.log('we have data', data);
      fs.appendFile(archive.paths.list, data.toString(), 'utf-8', function(err) {
        if (err) {
          console.log('Error', err);
        }
      });
    });

  },
  'OPTIONS': function() {
  }
};

exports.handleRequest = function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  requestType[req.method](req, res);
};
