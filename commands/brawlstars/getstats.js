const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const BrawlStars = require("../../Utilities/brawlStars");


module.exports = class GetStatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'getstats',
            aliases: ['stats'],
            group: 'brawlstars',
            memberName: 'getstats',
            description: 'Fetches the all time Brawl stats of a user',
            
        });
    }

    async run(message) {
        let embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.imgur.com/Ebe27is.png');

        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let stats = await BrawlStars.GetPlayerInfo(savedTag.playerTag);
            if(stats) {
                console.log(stats.tag);
                embed.setColor('#526EFF');
                embed.setTitle('Stats');
                embed.setDescription(`
                Tag: **${stats.tag}**

                name: **${stats.name}**

                trophies: **${stats.trophies}**

                Highest trophies: **${stats.highestTrophies}**

                EXP Level: **${stats.expLevel}**

                EXP Points: **${stats.expPoints}**

                3vs3 Victories: **${stats['3vs3Victories']}**

                Solo Victories: **${stats.soloVictories}**

                Duo Victories: **${stats.duoVictories}**
                `)
                return await message.embed(embed);

            }


        } else {
            embed.setColor('#D40C00');
            embed.setTitle("No Saved playerTag");
            embed.setDescription('Hey it looks like you havent saved your playerTag.... Use !savetag <playerTag> to save your playerTag');
            return await message.embed(embed);

        }

    }

};
