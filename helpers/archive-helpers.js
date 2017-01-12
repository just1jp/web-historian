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


exports.readListOfUrls = function() {
  fs.readFile('./archives/sites.txt', 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    archivedSites = data.split('url=');
    archivedSites.shift();
  });
  return archivedSites;
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};























