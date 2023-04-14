const session = require('express-session')
const MongoStore = require("connect-mongo")

// Session settings for admin
const configureAdminSession = () =>{
    const sessionStore = MongoStore.create({
        mongoUrl: `${process.env.DATABASE_URI}?retryWrites=true&w=majority`,
        secret: process.env.STORE_SECRET,
        ttl: 3600000, // 1 hour in milliseconds
        autoRemove: 'native'
    });
    
    sessionStore.on("error", function (err) {
        console.log("Session Error: ", err);
    });
    
    const sessionSettings = {
        store: sessionStore,
        name: "adminAuth",
        secret: process.env.ADMIN_SECRET_KEY,
        resave: false,
        saveUninitialized: true, 
        cookie: {
          maxAge: 3600000, // 1 hour in milliseconds
          httpOnly: true,
          // secure: true,
        },
    }

    return session(sessionSettings)
}

const sessionAuthenticator = (req, res, next) => {
    const now = Date.now();
    if(req?.session?.adminId){
        console.log("Session authenticated");
        next();
    } else {
        res.status(400).json({message: "Forbiden!!!"})
    }
}

module.exports = {sessionAuthenticator, configureAdminSession}