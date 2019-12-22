var Discord = require('discord.io');
var auth = require("./auth.json");

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
const fflogs = "https://www.fflogs.com/v1/report/fights/";
const api = "?api_key=a09f1b69faa412933f8e778d39e4b3ac";
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.sendMessage({
        to: (658368932763271173, 622222853273681921),
        message: 'Logged in as: ' + bot.username + bot.id
    });
});

bot.on('message', function(user, userID, channelID, message, event) {
  if (message.substring(0, 1) == '!') {
      var args = message.substring(1).split(' ');
      var cmd = args[0];

      args = args.splice(1);
      switch(cmd) {
          // !test
          case 'test':
              bot.sendMessage({
                  to: channelID,
                  message: 'Hello!'
              });
          break;
       }
   }
   if (message === "oh no") {
     bot.sendMessage({
         to: channelID,
         message: 'say it aint so'
     });
   }
   if (message.substring(0, 38) == ('!split https://www.fflogs.com/reports/')) {
     var result = message.match(/reports\/([\w-']+)/);
     var fightReport = fflogs+result[1]+api;
     var getJSON = require('get-json')
     var finalMSG = '';
     try {
       getJSON(fightReport,
          function(error, response){
            var obj = new Object;
            obj = response;
            console.log('=====');
            console.log('=====');
            console.log('=====');
            console.log('=====');
            try {
              for (var i = 0; i < 99; i++) { //since get-json module does not have for-each this will repeat until function catches an error and exits out
                if (obj.fights[i].kill) {
                  var fightLink = 'https://www.fflogs.com/reports/' + result[1] + '#playermetrictimeframe=today&fight='+(i+1)+'&type=damage-done'
                  var time = (obj.fights[i].end_time - obj.fights[i].start_time)/60000; //converting total fight time from miliseconds to minutes
                  var min = Math.floor(time);
                  var sec = Math.round((time % min)*60);
                  if (sec <= 9) { //converts 1 => 01, 5 => 05, etc
                    sec = '0' + sec;
                  }
                  var killTime = min+':'+sec;
                  finalMSG += ('('+killTime+') '+obj.fights[i].name+' @'+obj.fights[i].zoneName+'\n'+fightLink+'\n');
                }
              }
            } catch (e) {
              //console.log('for loop caught => '+e);
            }
            bot.sendMessage({
                to: channelID,
                message: finalMSG
            });
          }
        );
     } catch (e) {
       bot.sendMessage({
           to: channelID,
           message: 'caught'
       });
       bot.sendMessage({
           to: channelID,
           message: e
       });
     }
   }
});
