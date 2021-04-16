const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    playerTag: {
        type: String,
        required: true
    },
    discordID: {
        type: String,
        required: true
    },
    discordName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Users', userSchema);
