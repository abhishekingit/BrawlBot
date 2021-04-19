const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const path = require('path');
const fs = require("fs");

module.exports = class UpdateTagCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'updatetag',
            aliases: ['update'],
            group: 'brawlstars',
            memberName: 'updatetag',
            description: 'Updates the brawlstars playerTag of a user',
            args: [
                {
                    key: 'newTag',
                    prompt: 'Jeez....\:man_facepalming: I also need a playerTag for updating the old one',
                    type: 'string'

                },

            ],
        });
    }

    async run(message, {newTag}) {
        let embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.imgur.com/Ebe27is.png');


        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let updatedTag = await Database.UpdatePlayerTag(message.author.id, newTag);
            embed.setColor('#32C12C');
            console.log(newTag);
            embed.setTitle(newTag);
            embed.setDescription('Done, your player tag is now updated!!!');
            return await message.author.send(embed);

        } else {
            embed.setColor('#D40C00');
            embed.setTitle("No Existing playerTag");
            embed.setDescription('Dang! It looks like you dont have an existing playerTag.... Use !savetag <playerTag> to save your playerTag');
            return await message.embed(embed);
            
        }


    }


};
