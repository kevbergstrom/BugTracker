const{
    COMMENT_MAX_LENGTH
} = require('../config')

const validateComment = (desc) => {
    if(desc.length < 1){
        throw new Error('Comment is not long enough')
    }
    if(desc.length > COMMENT_MAX_LENGTH){
        throw new Error('Comment is too long')
    }
}

module.exports = {
    validateComment
}