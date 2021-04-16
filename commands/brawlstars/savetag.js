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
            description: 'Saves the playerTags to DB',
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
        let player = {
            tag: playerTag,
            discordID: message.author.id,
            discordName: message.author.username

        }
        let User = await Database.SavePlayerTag(playerTag, message.author.id, message.author.username);
        if(!User) {
            await message.channel.send(`Hey it looks like your playertag is already saved!!`);
        }

        // fs.writeFileSync(path.resolve(__dirname, 'tags.json'), JSON.stringify(player));
                
        
        console.log(player);  

        

    }



};


