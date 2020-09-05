const { PROFILE_DESC_MAX_LENGTH } = require('../config')

const validateProfile = (desc) => {
    if(desc.length > PROFILE_DESC_MAX_LENGTH){
        throw new Error('Description is too long')
    }
}

module.exports = {
    validateProfile
}