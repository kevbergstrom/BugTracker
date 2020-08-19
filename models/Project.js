const mongoose = require('mongoose')
let Schema = mongoose.Schema

const User = require('./User')
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
    joined: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    isPrivate: { type: Boolean, default: true },
    languages: [String]
})

projectSchema.index({title: 'text', desc: 'text'})

projectSchema.post('remove', async function(){
    // Remove the associated bugs
    this.bugs.map(async (ref) => {
        let foundBug = await Bug.findById(ref)
        if(foundBug){
            foundBug.remove()
        }
    })
    const projId = this.id
    // Delete everything referencing this project
    await User.updateMany({'projects': projId}, { $pull: {'projects': projId} } )
    // Delete all of the invites referencing this project
    await User.updateMany({'invites': projId}, { $pull: {'invites': projId} } )
})

projectSchema.methods.hasMember = function (user) {
    return this.members.indexOf(user) >= 0
}

const Project = mongoose.model('Project', projectSchema)
module.exports = Project