var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');


var requestType = {
  'GET': function(req, res) {
    httpHelpers.serveAssets(200, res, 'index.html');
  },
  'POST': function(req, res) {

    req.on('data', function(data) {
      var searchedUrl = data.toString().replace('url=', '');
      // Need to check if the input is archived
      archive.isUrlArchived(searchedUrl, function(err, exists) {
        // If it is, serve up the assets
        if (exists) {
          // TODO: Add function that serves archived site
        } else {
          // If not, add UrlToList
          archive.addUrlToList(searchedUrl, function(err) {
            if (err) { throw err; }
          });
          // Serve up loading.html page
          httpHelpers.serveAssets(302, res, 'loading.html');
        }
      });
    });

  },
  'OPTIONS': function() {
  }
};

exports.handleRequest = function (req, res) {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  requestType[req.method](req, res);
};
