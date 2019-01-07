var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        var characterSR = ["ELESIS", "ARME", "LIRE", "RYAN", "RONAN", "AMY", "JIN", "LASS", "SIEGHART", "LEY", "RIN", "DIO"];
        var characterS;
        var equipment;
        
       
        args = args.splice(1);

        /// This will autopopulate characters
        /// Only allow GC Channgel and Testing server
        if(channelID === "531559203005792266" || channelID ==="531389494016868353") {
            if(characterSR.indexOf(cmd.toUpperCase()) > -1) {
                bot.sendMessage({
                    to: channelID,
                    message: "http://grandchase.wikia.com/wiki/" + cmd + "/Grand_Chase_Dimensional_Chaser#Evolution"
                });          
            }
            else { 
                bot.sendMessage({
                    to:channelID,
                    message: "Too much for me to process! (ﾟAﾟ;)"
                });
            }
            /*switch(cmd) {
                /// This will autopopulate characters
                case 'elesis':
                    bot.sendMessage({
                        to: channelID,
                        message: 'http://grandchase.wikia.com/wiki/Elesis/Grand_Chase_Dimensional_Chaser#Evolution'
                    });
                break;
                }*/
        }
     }
});