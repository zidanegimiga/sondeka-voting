const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken')

// Kikulach0K1ngu0n1mwak0

const login = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const admin = await Admin.findOne({ name: req.body.name });
  if (!admin) {
    return res.status(401).json({ title: 'One Little Problem', description: 'Invalid login details. Contact your technician for support' })
  }

  const match = await bcrypt.compare(password, admin.password)
  if (!match) return res.status(401).json({ title: 'One Little Problem', description: 'Invalid login details. Contact your technician for support' })

  const adminId = admin._id.toString()

  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "email": admin.email,
        "userId": adminId
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1000m' }
  )

  const userDetails = {
    email: admin.email,
    id: adminId,
  }

  const refreshToken = jwt.sign(
    { "email": admin.email, "userId": userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server 
    secure: true, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match refreshToken
  })

  res.status(200).json({ accessToken, userDetails })
})

const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      asyncHandler(async (err, decoded) => {
          if (err) return res.status(403).json({ message: 'Forbidden' })

          const foundUser = await Admin.findOne({ username: decoded.email }).exec()

          if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

          const accessToken = jwt.sign(
              {
                  "UserInfo": {
                      "username": foundUser.username,
                      "userId": foundUser._id.toString()
                  }
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '15m' }
          )

          res.json({ accessToken })
      })
  )
}

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
})

module.exports = { login, logout, refresh }