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

const PORT = process.env.PORT || 3500


const resJsn = {
  hello: 1,
  world: 2
}


connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use(express.static('./server/public'));
app.use('/', express.static(path.join(__dirname, 'server', 'public')))

app.use('/', require('./routes/root'))
app.use('/confirmed', require('./routes/confirmEmailRoute'))
app.use('/invalid', require('./routes/invalidLinkRoute'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/admin/categories', require('./routes/admin/categoriesRoutes'))
app.use('/admin/nominees', require('./routes/admin/nomineesRoutes'))
app.use('/vote', require('./routes/voteRoute'))

app.post('/signup', usersController.createNewUser)
app.get('/:id/verify/:token/', usersController.confirmEmail) 
app.post('/reverify', usersController.resendVerificationLink) 
app.get('/test', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'test.html'))
}) 

app.get('/pdf/ditoro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resources', 'ditoro.pdf'))
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
