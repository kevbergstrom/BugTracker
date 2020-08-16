const { 
    PASSWORD_MIN_LENGTH, 
    PASSWORD_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH } = require('../config')



const validateUser = (email, username, password) => {
    if(username.length < USERNAME_MIN_LENGTH){
        throw new Error('Username is not long enough')
    }
    if(username.length > USERNAME_MAX_LENGTH){
        throw new Error('Username is too long')
    }
    if(!validateUsername(username)){
        throw new Error('Invalid username')
    }
    if(email.length > EMAIL_MAX_LENGTH){
        throw new Error('Email is too long')
    }
    if(!validateEmail(email)){
        throw new Error('Invalid email')
    }
    if(password.length < PASSWORD_MIN_LENGTH){
        throw new Error('Password is not long enough')
    }
    if(password.length > PASSWORD_MAX_LENGTH){
        throw new Error('Password is too long')
    }
}

const validateUsername = username => {
    let re = /^[a-z0-9]+$/i;
    return re.test(username)
}

const validateEmail = email => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

module.exports = {
    validateUser
}