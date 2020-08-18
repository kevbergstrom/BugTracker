const {
    BUG_NAME_MAX_LENGTH,
    BUG_DESC_MAX_LENGTH
} = require('../config')

const validateBug = (title, desc) => {
    if(title.length < 1){
        throw new Error('Title is not long enough')
    }
    if(title.length > BUG_NAME_MAX_LENGTH){
        throw new Error('Title is too long')
    }
    if(desc.length < 1){
        throw new Error('Description is not long enough')
    }
    if(desc.length > BUG_DESC_MAX_LENGTH){
        throw new Error('Description is too long')
    }
}

module.exports = {
    validateBug
}