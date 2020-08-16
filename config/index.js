module.exports = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_LIFETIME: process.env.SESSION_LIFETIME || 1000 * 60 * 2,
    SESSION_NAME: process.env.SESSION_NAME || 'sid',
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 128,
    USERNAME_MIN_LENGTH: 1,
    USERNAME_MAX_LENGTH: 32,
    EMAIL_MAX_LENGTH: 64
}