const Nominee = require('../../models/Nominee');
const Category = require('../../models/Category');
const asyncHandler = require('express-async-handler');
const { resolve } = require('path');
const cloudinary = require('../../utils/uploadImage')

// @desc Get all nominees
// @route GET /admin/nominees/allNominees
// @access Private
const getAllNominees = asyncHandler(async (req, res) => {
    // Get all nominees from MongoDB
    const nominees = await Nominee.find({}).lean()

    // If no nominees 
    if (!nominees?.length) {
        return res.status(400).json({ message: 'No nominees found' })
    }

    res.json(nominees)
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
    const { stageName, fullName, categoryName, socialMedia, submission, profilePicture, bio } = req.body

    // // Confirm data
    if (!profilePicture || !fullName || !stageName || !bio || !categoryName || !submission) {
        return res.status(400).json({
            message: 'All fields are required',
            success: false,
        })
    }

    // // Check for duplicate record
    const nominee = await Nominee.findOne({ stageName }).lean().exec()

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

    try{
        if(profilePicture){
            console.log("Profile Pic: ", profilePicture)
            const uploadedImage = await cloudinary.uploader.upload(profilePicture, {folder: "nominees"});
            if(uploadedImage){
                console.log("Uploaded IMG: ", uploadedImage)
                const nomineeObject = { fullName, stageName, bio, categoryName, socialMedia, submission, categoryId: category._id, profilePicture: uploadedImage }
                
                // Create and store new nominee
                const newNominee = await Nominee.create(nomineeObject)
                if (newNominee) { //nominee created
                    category.nominees.push(newNominee._id);
                    await category.save();
                    res.status(201).json({ message: `Nominee: ${stageName} successfully created.` })
                } else {
                    res.status(400).json({ message: 'Invalid nominee data received' })
                }
            }
            
        }
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    }
})

// @desc Update a category
// @route PATCH /admin/categories/updateCategory
// @access Private
const updateNominee = asyncHandler(async (req, res) => {
    const { stageName, fullName, categoryName, socialMedia, submission, profilePicture, bio } = req.body
    const { id, name, description, poster, category } = req.body

    // Confirm data 
    if (!id || !name) {
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
        return res.status(409).json({ message: 'Duplicate nominee name' })
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
    deleteNominee, updateNominee, createNewNominee, getOneNominee, getAllNominees
}
