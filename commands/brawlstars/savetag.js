const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const path = require('path');
const fs = require("fs");


module.exports = class SaveTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'savetag',
            aliases: ['save'],
            group: 'brawlstars',
            memberName: 'savetag',
            description: 'Saves the brawlstars playerTags of a user',
            args: [
                {
                    key: 'playerTag',
                    prompt: 'Ahh..I need your player Tag!',
                    type: 'string'
                },
            ],
        });
    }

    async run(message, {playerTag}) {
        let embed = new Discord.MessageEmbed()        
        .setThumbnail('https://i.imgur.com/Ebe27is.png');
                   
        
        let player = {
            tag: playerTag,
            discordID: message.author.id,
            discordName: message.author.username

        }
        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            embed.setColor('#FFCD00');
            embed.setTitle(savedTag.playerTag);
            embed.setDescription('Hey it looks like your playertag is already saved!!');
            return await message.embed(embed);

        } else {
            let User = await Database.SavePlayerTag(playerTag, message.author.id, message.author.username);
            embed.setColor('#32C12C');
            console.log(playerTag);
            embed.setTitle(playerTag);
            embed.setDescription('Done, your player tag is saved!!!');
            return await message.author.send(embed);

        }    
        
        // fs.writeFileSync(path.resolve(__dirname, 'tags.json'), JSON.stringify(player));
                
        
        console.log(player);  

        

    }



};


