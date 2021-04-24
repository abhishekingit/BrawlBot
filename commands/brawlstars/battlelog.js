const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const BrawlStars = require("../../Utilities/brawlStars");

module.exports = class BattleLogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'battlelog',
            aliases: ['getbattlelog'],
            group: 'brawlstars',
            memberName: 'battlelog',
            description: 'Fetches the Battle log for a user'
        });
    }

    async run(message) {
        let embed = new Discord.MessageEmbed() 
        .setThumbnail('https://i.imgur.com/Ebe27is.png');

        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let Battlelog = await BrawlStars.GetBattleLog(savedTag.playerTag);
            // console.log(Battlelog.items[1].event);
            // console.log(Battlelog.items[1].battleTime);
            embed.setColor('#7F4FC9');
            embed.setTitle(`Battlelog for ${savedTag.playerTag}`);
            embed.setFooter('Last played at');           
            embed.setDescription(`
                ${Battlelog.items.slice(0,6).map((item, i) => `
                    **Event**: ${item.event.mode} ${(item.battle.result === 'victory' || item.battle.rank <= 6) ? '\:white_check_mark:' : '\:x:' }
                    **Map**: ${item.event.map}
                      ${item.event.mode !== 'soloShowdown' ? `${item.battle.starPlayer.tag === savedTag.playerTag ? '\:star:' : ''}` : `**Rank**: ${item.battle.rank}`}
                `)}
                
            `)
            return await message.embed(embed);
            


        } else {

            console.log("no saved tag");

        }
    }
} 