const { default: mongoose } = require('mongoose');
const Categories = require('../../models/Category');
const Nominees = require('../../models/Nominee');
const Voters = require('../../models/User');
const asyncHandler = require('express-async-handler');

// @desc Get all numbers of voters, categories and nominees
// @route GET /admin/dashboard/dashboard
// @access Private
const getDashboardCounts = asyncHandler(async (req, res) => {
    const counter = {}
    const models = { Categories, Nominees, Voters };

    try {
        for (const [modelName, model] of Object.entries(models)) {
            const count = await model.countDocuments();
            counter[modelName] = count;
        }

        res.status(200).json(counter)

    } catch (err) {
        console.error('Error getting collection counts:', err);
        res.status(500).json({ error: 'Could not get collection counts' });
    }
})

module.exports = getDashboardCounts;