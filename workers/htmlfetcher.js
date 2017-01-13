var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;
var fs = require('fs');



module.exports = function() {

  var job = new CronJob({
    cronTime: '*/5 * * * * *', 
    onTick: function() {
      fs.appendFile(archive.paths.log, 'Archived sites scraped at ' + (new Date()).toLocaleString() + '\n', 'utf-8', function(err) {
        if (err) { throw err; }
      });
      archive.readListOfUrls(function(err, sites) {
        console.log('scrape sites', sites);  
        archive.downloadUrls(sites);
      });
    }, 
    start: true, 
    timeZone: 'America/Los_Angeles'
  });

  console.log('CronJob Running:', job.running); 

};