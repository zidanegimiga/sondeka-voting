require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnect')
const MongoStore = require("connect-mongo")
const mongoose = require('mongoose')
const usersController = require('./controllers/users/usersControllers')

const PORT = process.env.PORT || 3500;

// Load database
connectDB();

// app setup
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser(process.env.ADMIN_SECRET_KEY))
app.use(express.static('./server/public'))
app.use('/', express.static(path.join(__dirname, 'server', 'public')))
app.use('/', require('./routes/root'))

// Voter routes
app.use('/confirmed', require('./routes/confirmEmailRoute'))
app.use('/invalid', require('./routes/invalidLinkRoute'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/vote', require('./routes/voteRoute'))
app.post('/signup', usersController.createNewUser)
app.get('/:id/verify/:token/', usersController.confirmEmail)
app.post('/reverify', usersController.resendVerificationLink)

//Categories Routes
app.use('/categories', require('./routes/categories/categoryRoutes'))

// Nominees Routes
app.use('/nominees', require('./routes/nominees/nomineesRoutes'))

// Admin Routes
app.use('/admin', require('./routes/admin/adminRoutes'))

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

// Log errors to log files
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
