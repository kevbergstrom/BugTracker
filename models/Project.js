const mongoose = require('mongoose')
let Schema = mongoose.Schema

let projectSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    desc: String,
    link: String,
    bugCount: { type: Number, default: 0 },
    bugs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ],
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    created: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: true },
    languages: [String]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project