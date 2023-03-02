require('dotenv').config({path:__dirname+'/.env'})
const express = require('express')
const app = express()
const path = require('path');
const { logger, logEvents } = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnect')
const mongoose = require('mongoose')
const usersController = require('./controllers/usersControllers')
const ejs = require('ejs');

const PORT = process.env.PORT || 3500


const resJsn = {
  hello: 1,
  world: 2
}


connectDB()

app.set('view engine', 'ejs')

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.post('/signup', usersController.createNewUser)
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.get('/:id/verify/:token/', usersController.confirmEmail)

app.get('/json', (req, res) => {
    res.json(resJsn)
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
