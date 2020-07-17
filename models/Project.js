const mongoose = require('mongoose')
let Schema = mongoose.Schema

let projectSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    desc: String,
    bugCount: { type: Number, default: 0 },
    bugs: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            title: String,
            desc: String,
            number: Number,
            created: { type: Date, default: Date.now },
            completedOn: { type: Date, default: null },
            severity: Number,
            comments: [
                {
                    author: {
                        type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    created: { type: Date, default: Date.now },
    private: { type: Boolean, default: true },
    languages: [String]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project