const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const { userRoute, projectRoute, bugRoute, commentRoute } = require('./routes')

// configs
const { 
    PORT, 
    NODE_ENV,
    MONGO_URI,
    SESSION_SECRET,
    SESSION_LIFETIME,
    SESSION_NAME} = require('./config')

// mongoose
const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false}
)
console.log('Connected to database')

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// session
app.use(session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESSION_LIFETIME) / 1000
    }),
    cookie: {
        sameSite: true,
        //only secure during production
        secure: NODE_ENV === 'production', 
        maxAge: parseInt(SESSION_LIFETIME)
    }
}))

// routes
const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/user', userRoute )
apiRouter.use('/project', projectRoute)
apiRouter.use('/project/:projectId/bug', bugRoute)
apiRouter.use('/project/:projectId/bug/:bugId/comment', commentRoute)

//for heroku
//serve static assets in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    //serve index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})