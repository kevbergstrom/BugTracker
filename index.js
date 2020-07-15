const express = require('express')
const app = express()
const { userRoute } = require('./routes')

//configs
const { PORT, MONGO_URI } = require('./config')

// mongoose
const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true}
)
console.log('Connected to database')

// routes
const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/user', userRoute )

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})