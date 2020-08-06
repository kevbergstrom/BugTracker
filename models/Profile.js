const mongoose = require('mongoose')
let Schema = mongoose.Schema

let profileSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    desc: String
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile