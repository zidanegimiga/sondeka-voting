const Voter = require('../models/User');
const Token = require('../models/token');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../utils/email/sendConfirmation');
const jwt = require('jsonwebtoken')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await Voter.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, email} = req.body

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({
            message: 'All fields are required',
            success: true,
        })
    }

    // Check for duplicate email
    const voter = await Voter.findOne({ email }).lean().exec()

    if (voter) {
        return res.status(409).json({ 
            message: 'User with that e-mail address exists',
            success: false,
        })
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT)); 
    const hashedPwd = await bcrypt.hash(password, salt) // salt rounds

    const userObject = { username, "password": hashedPwd, email }

    // Create and store new user 
    const user = await Voter.create(userObject)

    const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    })

    const baseURL = process.env.NODE_ENV === "development" ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD
    const url = `${baseURL}/${user.id}/verify/${token.token}`;
    console.log("Base Url: ", baseURL)

    // E-Mail details
    const mailOptions = {
        email: user.email,
        subject: 'Sondeka Awards 2023 - Email Verification',
        html: `<p>Please click the following link to verify your email address:</p><p style="background-color: "#000000";padding:"6px 8px""><a href="${url}">Verify Link</a></p>`
    }

    if (user) { //created
        await sendEmail(mailOptions); 
        res.status(201).json({ message: `Account for ${username} successfully created. Check email for verification link` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Verify user's email
// @route POST /users/?
// @access Private
const confirmEmail = asyncHandler(async (req, res) =>{
        const user = await Voter.findOne({ _id: req.params.id });    
        if (!user) return res.status(400).render('inValidLink');
        
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).render('inValidLink');
    
        await Voter.updateOne({ verified: true });

        console.log("User: ", user)
        
        await token.remove();
        res.status(201).render('emailConfirmed', )
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password } = req.body

    // Confirm data 
    if (!id || !username ) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await Voter.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await Voter.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.email = email

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await Voter.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    confirmEmail
}
