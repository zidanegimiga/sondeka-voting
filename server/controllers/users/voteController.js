const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const VotingLog = require('../../models/VotingLog')
const VotingCategory = require('../../models/Category')
const Nominee = require('../../models/Nominee')

// @desc Vote
// @route POST /vote
// @access Private
const vote = asyncHandler(async (req, res) => {
    try {
        const choices = req.body;
        if (choices.length !== 10) {
            res.status(400).json({ message: "Please cast your vote in all categories before you submit" })
        }

        choices.forEach(async (choice) => {
            const category = await VotingCategory.find({ name: choice.categoryName });
            if (!category) {
                return res.status(400).json({ message: 'Invalid category ID' });
            }

            const nominee = await Nominee.findById(mongoose.Types.ObjectId(choice.nomineeId));
            if (!nominee || nominee.categoryName !== choice.categoryName) {
                return res.status(400).json({ message: 'Invalid nominee ID' });
            }

            const existingVoteLogEntry = await VotingLog.findOne({ voterId: choice.voterId, categoryName: choice.categoryName});
            if (existingVoteLogEntry) {
                return res.status(400).json({ message: 'You have already voted in this category' });
            }

            const voteLogEntry = new VotingLog({
                voterId: mongoose.Types.ObjectId(choice.voterId),
                categoryName: choice.categoryName,
                nomineeId: mongoose.Types.ObjectId(choice.nomineeId),
                timestamp: Date.now()
            });

            await voteLogEntry.save();

            nominee.votes += 1;
            await nominee.save();
        })
        
        return res.status(200).json({ message: 'Vote successfully recorded!' });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = { vote }