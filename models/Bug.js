const mongoose = require('mongoose')
let Schema = mongoose.Schema

let bugSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    desc: String,
    number: Number,
    created: { type: Date, default: Date.now },
    stage: { type: Number, default: 0 },
    progress: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            date: { type: Date, default: Date.now }
        }
    ],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    comments: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
            desc: String,
            created: { type: Date, default: Date.now }
        }
    ]
})

const Bug = mongoose.model('Bug', bugSchema)
module.exports = Bug