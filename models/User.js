const mongoose = require('mongoose')
const { hashSync, compareSync } = require('bcryptjs')
let Schema = mongoose.Schema

const Profile = require('./Profile')

let userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: email => User.doesNotExist({ email }),
            message: "Email already exists"
        }
    },
    username: {
        type: String,
        validate: {
            validator: username => User.doesNotExist({ username }),
            message: "Username already exists"
        }
    },
    password: String,
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ],
    invites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    created: { type: Date, default: Date.now }
})

userSchema.pre('save', function(){
    if (this.isModified('password')){
        this.password = hashSync(this.password, 10)
    }
})

userSchema.pre('remove', async function(){
    const foundProfile = await Profile.findById(this.Profile)
    if(foundProfile){
        foundProfile.remove()
    }
})

userSchema.statics.doesNotExist = async function(field) {
    return await this.where(field).countDocuments() === 0
}

userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password)
}

userSchema.methods.hasFavorite = function (favorite) {
    return this.favorites.indexOf(favorite) >= 0
}

userSchema.methods.hasProject = function (project) {
    return this.projects.indexOf(project) >= 0
}

userSchema.methods.hasInvite = function (invite) {
    return this.invites.indexOf(invite) >= 0
}

const User = mongoose.model('User', userSchema)
module.exports = User