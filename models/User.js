const mongoose = require('mongoose')
const { hashSync, compareSync } = require('bcryptjs')
let Schema = mongoose.Schema

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
    created: { type: Date, default: Date.now }
})

userSchema.pre('save', function(){
    if (this.isModified('password')){
        this.password = hashSync(this.password, 10)
    }
})

userSchema.statics.doesNotExist = async function(field) {
    return await this.where(field).countDocuments() === 0
}

userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User