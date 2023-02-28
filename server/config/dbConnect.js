const mongoose = require('mongoose')

const uri = process.env.DATABASE_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;