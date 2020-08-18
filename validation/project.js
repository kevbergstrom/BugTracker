const {
    PROJECT_NAME_MAX_LENGTH,
    PROJECT_DESC_MAX_LENGTH,
    PROJECT_LINK_MAX_LENGTH,
    PROJECT_LANG_MAX_LENGTH,
} = require('../config')

const validateProject = (title, desc, link, languages) => {
    if(title.length < 1){
        throw new Error('Title is not long enough')
    }
    if(title.length > PROJECT_NAME_MAX_LENGTH){
        throw new Error('Title is too long')
    }
    if(link.length > PROJECT_LINK_MAX_LENGTH){
        throw new Error('Description is too long')
    }
    for(let i = 0;i<languages.length;i++){
        if(languages[i].length < 1){
            throw new Error('Technology is too short')
        }
        if(languages[i].length > PROJECT_LANG_MAX_LENGTH){
            throw new Error(`'${languages[i]}' is too long`)
        }
    }
    if(desc.length < 1){
        throw new Error('Description is not long enough')
    }
    if(desc.length > PROJECT_DESC_MAX_LENGTH){
        throw new Error('Description is too long')
    }
}

module.exports = {
    validateProject
}