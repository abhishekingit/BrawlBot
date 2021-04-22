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
            console.log(Battlelog.items[1].event);
            console.log(Battlelog.items[1].battle);
            embed.setColor('#7F4FC9');
            embed.setTitle('BattleLog');
            embed.setDescription(`
                ${Battlelog.items.slice(0,5).map((item, i) => `
                    **${item.event.mode}** ${(item.battle.result === 'victory' || item.battle.rank <= 6) ? '\:white_check_mark:' : '\:x:' }
                      ${item.event.map}
                `)}
                
            `)
            return await message.embed(embed);
            


        } else {

            console.log("no saved tag");

        }
    }
} 