const Nominee = require('../../models/Nominee');
const Voter = require('../../models/User');
const Category = require('../../models/Category');
const asyncHandler = require('express-async-handler');

// @desc Get all nominees
// @route GET /admin/voters/allVoters
// @access Private
const getAllVoters = asyncHandler(async (req, res) => {
    // Get all voters from MongoDB
    const voters = await Voter.find({}).lean()

    // If no voters 
    if (!voters?.length) {
        return res.status(400).json({ message: 'No voters found' })
    }

    res.json(voters)
})

// @desc Get one nominee
// @route GET /admin/nominees/oneNominee
// @access Private
const getOneNominee = asyncHandler(async (req, res) => {
    const id = req.params.nomineeId;

    const nominee = await Nominee.findById(id).exec()

    if (!nominee) {
        return res.status(400).json({ message: 'Nominee not found' })
    }

    res.status(200).json(nominee)

})

// @desc Create new nominee
// @route POST /admin/nominees/newNominee
// @access Private
const createNewNominee = asyncHandler(async (req, res) => {
    const { name, description, categoryName, poster} = req.body

    // Confirm data
    if (!name || !description || !poster || !categoryName) {
        return res.status(400).json({
            message: 'All fields are required',
            success: true,
        })
    }

    // Check for duplicate record
    const nominee = await Nominee.findOne({ name }).lean().exec()

    if (nominee) {
        return res.status(409).json({ 
            type: 'existingNominee', 
            title: 'One Little Problem', 
            description: 'This nominee seems to exist.',
            success: false,
        })
    }

    //Find the category they belong in
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
        return res.status(404).json({ message: `Category "${categoryName}" not found.` });
    }

    const nomineeObject = { name, description, poster, categoryName, category: category._id }

    // Create and store new nominee
    const newNominee = await Nominee.create(nomineeObject)

    if (newNominee) { //nominee created
        category.nominees.push(newNominee._id);
        await category.save(); 
        res.status(201).json({ message: `Nominee: ${name} successfully created.` })
    } else {
        res.status(400).json({ message: 'Invalid nominee data received' })
    }
})

// @desc Update a category
// @route PATCH /admin/categories/updateCategory
// @access Private
const updateNominee = asyncHandler(async (req, res) => {
    const { id, name, description, poster, category } = req.body

    // Confirm data 
    if (!id || !name ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the category exist to update?
    const nominee = await Nominee.findById(id).exec()

    if (!nominee) {
        return res.status(400).json({ message: 'Nominee not found' })
    }

    // Check for duplicate 
    const duplicate = await Nominee.findOne({ name }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate nominee name'})
    }

    nominee.name = name
    nominee.description = description
    nominee.poster = poster

    const updatedNominee = await nominee.save()

    res.json({ message: `${updatedNominee.name} updated` })
})

// @desc Delete a nominee
// @route DELETE /admin/nominees/deleteNominee
// @access Private
const deleteNominee = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Nominee ID Required' })
    }

    // Does the user exist to delete?
    const nominee = await Nominee.findById(id).exec()

    if (!nominee) {
        return res.status(400).json({ message: 'Nominee not found' })
    }

    const result = await nominee.deleteOne()

    const reply = `Nominee ${result.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllVoters
}
