var Discord = require('discord.io');
var auth = require("./auth.json");

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
    bot.sendMessage({
        to: 563204852453343232,
        message: 'Logged in as: ' + bot.username + bot.id
    });
});

bot.on('message', function(user, userID, channelID, message, event) {
  if (message.substring(0, 1) == '!') {
      var args = message.substring(1).split(' ');
      var cmd = args[0];

      args = args.splice(1);
      switch(cmd) {
          // !ping
          case 'ping':
              bot.sendMessage({
                  to: channelID,
                  message: 'Pong!'
              });
          break;

          case 'hello':
              bot.sendMessage({
                  to: channelID,
                  message: 'Hello'
              });
          break;
       }
   }
});
