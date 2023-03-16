const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const VotingLog = require('../models/VotingLog')
const Voter = require('../models/User')
const VotingCategory = require('../models/Category')
const Nominee = require('../models/Nominee')

// @desc Vote
// @route POST /vote
// @access Private
const vote = asyncHandler(async (req, res) => {
    try {
        const { categoryId, nomineeId, voterId } = req.body;

        // Is category and nominee valid?
        const category = await VotingCategory.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const nominee = await Nominee.findById(nomineeId);
        if (!nominee || nominee.category_id.toString() !== categoryId) {
            return res.status(400).json({ message: 'Invalid nominee ID' });
        }

        // Has the user voted?
        const existingVoteLogEntry = await VotingLog.findOne({ voterId: voterId, category_id: categoryId });
        if (existingVoteLogEntry) {
            return res.status(400).json({ message: 'You have already voted in this category' });
        }

         // Create a new vote log entry
        const voteLogEntry = new VotingLog({
            voterId: mongoose.Types.ObjectId(voterId),
            categoryId: mongoose.Types.ObjectId(categoryId),
            nomineeId: mongoose.Types.ObjectId(nomineeId),
            timestamp: Date.now()
        });

        // Save the new vote log entry to the database
        await voteLogEntry.save();

        // Update the nominee's vote count
        nominee.votes += 1;
        await nominee.save();

        // Send a response indicating success
        return res.status(200).json({ message: 'Vote successfully recorded!' });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = { vote }