const User = require('../models/users');


async function SavePlayerTag(tag, id, username) {
    User.findOne({discordID: id})
    .then(userDoc => {
        if(userDoc) {
            return false;

        }
        const user = new User({
            playerTag: tag,
            discordID: id,
            discordName: username
        });
        return user.save()
        .then(result => {
            console.log("playerTag saved!");
    
        })
        .catch(err => {
            console.log(err);
        })

    })
    .catch(err => console.log(err));
    
    
    
}

module.exports = {SavePlayerTag};
