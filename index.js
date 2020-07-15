const express = require('express')
const app = express()
const { userRoute } = require('./routes')

//configs
const { PORT } = require('./config')

// routes
const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/user', userRoute )

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})