const { Client, RichEmbed } = require('discord.js');
const characterData = require('./characterData');
const emojiCharacters = require('./emojiCharacters');

var react = 0;
var remark = 0;
var input = "";

// Create an instance of a Discord client
const client = new Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

//Sends a Embedded Message depending on users input
client.on('message', message => {
    const embed = new RichEmbed()

    if (message.content.substring(0, 1) === '!') {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        input = cmd.toUpperCase(); 
        
        var characterSR = ["ELESIS", "ARME", "LIRE", "RYAN", "RONAN", "AMY", "JIN", "LASS", "SIEGHART", "LEY", "RIN", "DIO", "VEIGAS", "RUFUS"];

        args = args.splice(1);
        if(characterSR.indexOf(input) > -1) {
            //message.channel.sendMessage("http://grandchase.wikia.com/wiki/" + cmd + "/Grand_Chase_Dimensional_Chaser#Evolution");            
            //Get data from dictionary
            if(characterData.data[input]) {     
                embed.setImage(characterData.data[input].image)
                embed.setTitle(characterData.data[input].name)
                embed.setColor(0xFF0000)
                embed.setDescription(
                    characterData.data[input].name + "\n What would you like to know:" +
                        "\n1. Recommended Sets\n2. Recommended Accessories\n3. Recommended Traits"
                );
                react = 1;           

                //Attach reactions to sent message 
                message.channel.send(embed).then(async function (message) {
                    await message.react(emojiCharacters[1])
                    await message.react(emojiCharacters[2])
                    //await message.react(emojiCharacters[3])
                });
            }
        else { /*Nothing was found */ }
        }        
        else { 
            //embed.setImage(obj.image) //Show soccer chick with the whistle
            embed.setTitle("Error 404" - input)
            embed.setColor(0xFF0000)
            embed.setDescription("Too much for me to process! (ﾟAﾟ;)")
            react = 0;   
            message.channel.send(embed);
        }        
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.identifier === "1%E2%83%A3" && reaction.count > 1) {
        // This is for Recommended Sets
        remark = 1;
        reaction.message.delete();

        getSets(reaction, characterData.data[input]);
    } 
    else if(reaction.emoji.identifier === "2%E2%83%A3" && reaction.count > 1) {
        // This is for Recommended Accessories
        remark = 2;
        reaction.message.delete();
        
        getAccessories(reaction, characterData.data[input]);
    } 
    else if(reaction.emoji.identifier === "3%E2%83%A3" && reaction.count > 1) {
        remark = 3;
        reaction.message.delete();
    }
});

function getSets(reaction, data) {
    for(var value = 1; value <= data.sets.length - 1; value++) {            
        var getSet = ""; // Get Skills from the Array
        var getSetIcon = data.sets[value].set[0]; // Get Skills Icon            
        var getSetTitle = data.sets[value].set[1]; // Get Equip's Title
        
        for(var val = 2; val <= data.sets[value].set.length - 1; val++) {
            getSet += data.sets[value].set[val]; // Get Skills info
        }

        const embed = new RichEmbed()
        .setAuthor(getSetTitle, getSetIcon)
        .setColor(0xFF0000)
        .setDescription(getSet
            .replace(/\[/g,"**")
            .replace(/\]/g,"**")
        );
        reaction.message.channel.send(embed);
    }
}

function getAccessories(reaction, data) {
    let numberOfAccessoriesOptions = 0
    for(var value = 0; value <= data.Accessories.length - 1; value++) {            
        var getAcc = ""; // Get Skills from the Array
        var getAccIcon = data.Accessories[value].acc[0]; // Get Skills Icon
        var getAccTitle = data.Accessories[value].acc[1]; // Get Equip's Title
        
        numberOfAccessoriesOptions++; //Iterates the number of Accessories found for a character
        
        for(var val = 2; val <= data.Accessories[value].acc.length - 1; val++) {
            getAcc += data.Accessories[value].acc[val]; // Get Skills info
             
            const embed = new RichEmbed()
            .setTitle(getAccTitle)
            .setThumbnail(getAccIcon)
            //.setAuthor(getAccTitle, getAccIcon)
            .setColor(0xFF0000)
            .setDescription(getAcc
                .replace(/\[/g,"**")
                .replace(/\]/g,"**")
            );
            reaction.message.channel.send("Set Option " + numberOfAccessoriesOptions);
            reaction.message.channel.send(embed);
        }
    }
}
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login("NTMxMzYxNjgwMDgxNDIwMzAw.DxNGAA.9XoXNX_-0d9RyplPwbcQ_MtYKpk");