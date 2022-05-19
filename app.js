require('express-async-errors')
require('dotenv').config()

const express = require('express')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const app = express()
const connectDB = require('./db/connect')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const notfound = require('./middleware/notfound')
const authRouter = require('./routes/auth')
const jobsRoter = require('./routes/jobs')
const auth = require('./middleware/authenticated')

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({windowMs : 60 * 1000, max : 60}))

app.get('/', (req, res) =>{
  res.send('Jobs Api')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', auth, jobsRoter)
app.use(errorHandlerMiddleware)
app.use(notfound)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()