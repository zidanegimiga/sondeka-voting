const mongoose = require('mongoose')

// const uri = "mongodb+srv://zidanegimiga:oVoZyAbjDM9Rv0aY@sondekavoting.xb1qayv.mongodb.net/?retryWrites=true&w=majority"
const uri = process.env.DATABASE_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;