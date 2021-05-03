const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const BrawlStars = require("../../Utilities/brawlStars");

module.exports = class GetClubMembers extends Command {
    constructor(client) {
        super(client, {
            name: 'clubmembers',
            aliases: ['getclubmembers'],
            group: 'brawlstars',
            memberName: 'clubmembers',
            description: 'Fetches club members for a particular club that you are part of',
            args: [
                {
                    key: 'clubName',
                    prompt: 'Ahh..I need your club Name!',
                    type: 'string'
                },
            ],

        });
    }

    async run(message, {clubName}) {
        let embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.imgur.com/Ebe27is.png');

        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let playerInfo = await BrawlStars.GetPlayerInfo(savedTag.playerTag);
            if(playerInfo) {
                if(Object.keys(playerInfo.club).length !== 0) {
                    if(playerInfo.club.name === clubName) {
                        let clubInfo = await BrawlStars.GetClubMembers(playerInfo.club.tag);

                        embed.setColor('#526EFF');
                        embed.setTitle(`${playerInfo.club.name}`);
                        embed.setDescription(`
                            ${clubInfo.items.map((item, i) => `
                                ${item.name} **${item.tag}**                                
                                **${item.role}**
                                \:trophy: **${item.trophies}**                        
                            
                            `)}               
                        
                        `)
                        return await message.embed(embed);

                    }
                    

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



}