const express = require('express')
const app = express()
const { userRoute } = require('./routes')

const PORT = process.env.PORT || 5000

// routes
const apiRouter = express.Router()
app.use('/api', apiRouter)
apiRouter.use('/user', userRoute )

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})