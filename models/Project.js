const mongoose = require('mongoose')
let Schema = mongoose.Schema

let projectSchema = new Schema({
    owner: {
        type: 'ObjectID',
        ref: 'User'
    },
    bugs: [
        {
            author: {
                type: 'ObjectID',
                ref: 'User'
            },
            title: String,
            desc: String,
            created: { type: Date, default: Date.now },
            completedOn: { type: Date, default: null },
            severity: Number,
            comments: [
                {
                    author: {
                        type: 'ObjectID',
                        ref: 'User'
                    },
                    desc: String,
                    created: { type: Date, default: Date.now }
                }
            ]
        }
    ],
    members: [
        {
            type: 'ObjectID',
            ref: 'User'
        }
    ],
    created: { type: Date, default: Date.now },
    desc: String,
    private: { type: Boolean, default: true },
    languages: [String]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project