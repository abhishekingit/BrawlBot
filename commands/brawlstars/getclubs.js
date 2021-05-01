const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const BrawlStars = require("../../Utilities/brawlStars");

module.exports = class GetClubInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'getclubs',
            aliases: ['myclubs', 'clubs'],
            group: 'brawlstars',
            memberName: 'getclub',
            description: 'Fetches the clubs that the user belongs to'
                        
        });
    }

    async run(message) {
        let embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.imgur.com/Ebe27is.png');

        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let playerInfo = await BrawlStars.GetPlayerInfo(savedTag.playerTag);
            if(playerInfo) {
                if(Object.keys(playerInfo.club).length !== 0) {
                    embed.setColor('#526EFF');
                    embed.setTitle('Clubs');
                    embed.setDescription(`
                        Tag: **${playerInfo.club.tag}**
                        
                        Name: **${playerInfo.club.name}**                 
                    
                    `)
                    return await message.embed(embed);
                } else {
                    embed.setColor('#D40C00');
                    embed.setTitle("No club no Fun!");
                    embed.setDescription('You havent joined any clubs...');
                    return await message.embed(embed);

                    
                }
            }

        } else {
            embed.setColor('#D40C00');
            embed.setTitle("No Saved playerTag");
            embed.setDescription('Hey it looks like you havent saved your playerTag.... Use !savetag <playerTag> to save your playerTag');
            return await message.embed(embed);

        }


    }
};