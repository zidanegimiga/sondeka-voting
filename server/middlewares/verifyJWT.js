const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log("0. Authorisation: ", authHeader)

    // if (authHeader?.startsWith('Bearer') === false) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    //     //TD:
    //     // Redirect user to login/sign up when not authorized
    // }

    jwt.verify(
        authHeader,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("ERR: ", err)
                return res.status(403).json({ message: 'Forbidden' })
            }
            req.userId = decoded.UserInfo.userId
            req.email = decoded.UserInfo.email
            console.log("4. JWT Verified")
            next()
        }
    )
}

module.exports = verifyJWT