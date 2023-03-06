const VotingLog = require('../models/VotingLog')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Vote
// @route POST /vote
// @access Private
const vote = asyncHandler(async (req, res) =>{

})

module.exports = vote