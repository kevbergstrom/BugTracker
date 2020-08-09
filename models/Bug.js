const mongoose = require('mongoose')
let Schema = mongoose.Schema

const User = require('./User')

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
    favorited: { type: Boolean, default: false },
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

bugSchema.post('remove', async function(){
    const bugId = this.id
    // Delete all of the favorites referencing this bug
    await User.updateMany({'favorites': bugId}, { $pull: {'favorites': bugId} } )

})

const Bug = mongoose.model('Bug', bugSchema)
module.exports = Bug