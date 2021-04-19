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

async function GetPlayerTag(id) {
    return User.findOne({discordID: id})
    .then(userdoc => {
        return userdoc;        
              
    })
    
    .catch(err => console.log(err));

}

async function UpdatePlayerTag(id, newTag) {
    return User.findOneAndUpdate({discordID: id}, {playerTag: newTag}, {
        new: true
    })
    .then(result => {
        console.log('Updated playerTag');
        
    })
    .catch(err => {
        console.log(err);
    })
}


module.exports = {SavePlayerTag, GetPlayerTag, UpdatePlayerTag};
