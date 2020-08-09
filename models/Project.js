const mongoose = require('mongoose')
let Schema = mongoose.Schema

const Bug = require('./Bug')

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

projectSchema.post('remove', async function(){
    // Remove the associated bugs
    this.bugs.map(async (ref) => {
        let foundBug = await Bug.findById(ref)
        if(foundBug){
            foundBug.remove()
        }
    })
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project