var fs = require('fs');
var path = require('path');
var _ = require('underscore');

// Storage of websites that need to be archived or are already archived
var archivedSites = [];

// Helpers to simplify writing file path
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if (err) { throw err; }
    archivedSites = data.toString().split('\n');
    callback(err, archivedSites);
  });
};

exports.isUrlInList = function(URL, callback) {
  exports.readListOfUrls(function(err, data) {
    if (err) { throw err; }
    _.contains(data, URL.toLowerCase()) ? callback(err, true) : callback(err, false);
  });
};

exports.addUrlToList = function(URL, callback) {
  URL = URL.replace('url=', '');
  exports.isUrlInList(URL, function(err, exists) {
    if (err) { throw err; }
    if (!exists) {
      fs.appendFile(exports.paths.list, URL.toLowerCase() + '\n', 'utf-8', function(err) {
        callback(err);
      });
    }
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};























