const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

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
            console.log("JWT Verified")
            next()
        }
    )
}

module.exports = verifyJWT