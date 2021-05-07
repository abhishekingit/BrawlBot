const {Command} = require("discord.js-commando");
const Discord = require("discord.js");
const Database = require("../../Utilities/Database");
const BrawlStars = require("../../Utilities/brawlStars");

module.exports = class AddRoleLookforTeam extends Command {
    constructor(client) {
        super(client, {
            name: 'lfg',
            aliases: ['getteam'],
            group: 'brawlstars',
            memberName: 'lfg',
            description: 'assigns role looking-for-team',

        });

    }

    async run(message) {
        let embed = new Discord.MessageEmbed()
        .setThumbnail('https://i.imgur.com/Ebe27is.png');

        let savedTag = await Database.GetPlayerTag(message.author.id);
        if(savedTag) {
            let role = message.guild.roles.cache.find(r => r.name === "looking-for-team");
            if(message.member.roles.cache.has(role.id)) {
                embed.setColor('#D40C00');
                embed.setTitle(`You already have the role ${role.name}`);
                return await message.embed(embed);

            } else {
                message.member.roles.add(role).catch(err => console.log(err));
                embed.setColor(`#${(role.color).toString(16)}`);
                embed.setTitle(`You are assigned "looking-for-team" role`);
                embed.setDescription('Nice you can now play along with other people!');
                return await message.author.send(embed);

            }         


        } else {
            embed.setColor('#D40C00');
            embed.setTitle("No Saved playerTag");
            embed.setDescription('Hey it looks like you havent saved your playerTag.... Use !savetag <playerTag> to save your playerTag');
            return await message.embed(embed);

        }
    }
}