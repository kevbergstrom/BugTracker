const mongoose = require('mongoose')
const { hashSync, compareSync } = require('bcryptjs')
let Schema = mongoose.Schema

let userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
})

userSchema.pre('save', function(){
    if (this.isModified('password')){
        this.password = hashSync(this.password, 10)
    }
})

userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User