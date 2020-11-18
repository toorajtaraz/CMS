var CronJob = require('cron').CronJob;
const { Settings } = require('../models/settings');
const BRD  = require('./BRD');

const period_hour = Number (await Settings.findById(backup_period_hours));
const period_day = Number (await Settings.findById(backup_period_days));

var count = 0 ;



async function  repeatfunction () {

    BRD.backupRestoreDeamon();
    count++;

    console.log('Backup date :'+Date.now);
    console.log('Backed up times :'+count);
    console.log('Backup every :'+hours +'hours');


}
async function  run () {
    if(period_day == 0)
    {          

     var job = new CronJob(`* * */${period_hour} * * *`, function() {
        repeatfunction();
     });
      job.start();
    }

    else{                       // more than 24 hours
        if (period_hour == 0) {
         var job = new CronJob(`* * * */${period_day} * *`, function() {
        repeatfunction();
         });
         job.start();
        }
        else{
            var job = new CronJob(`* * ${period_hour} */${period_day} * *`, function() {
                repeatfunction();
                 });
                 job.start();
                }
        }

}


const auto_backup = () => { run(); };


module.exports = {
    auto_backup
}; 


