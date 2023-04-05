const Category = require('../../models/Category');
const Nominee = require('../../models/Nominee');
const asyncHandler = require('express-async-handler');

// @desc Get all categories
// @route GET /admin/categories/allCategories
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
    // Get all categories from MongoDB
    const categories = await Category.find({}).lean()

    // If no categories 
    if (!categories?.length) {
        return res.status(400).json({ message: 'No categories found' })
    }

    res.json(categories)
})

// @desc Get all categories
// @route GET /admin/categories/allCategories
// @access Private
const getOneCategory = asyncHandler(async (req, res) => {
    const id = req.params.categoryId;

    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    res.status(200).json(category)

})

// @desc Create new category
// @route POST /admin/categories/newCategory
// @access Private
const createNewCategory = asyncHandler(async (req, res) => {
    const { name, description, poster } = req.body

    // Confirm data
    if (!name || !description || !poster) {
        return res.status(400).json({
            message: 'All fields are required',
            success: true,
        })
    }

    // Check for duplicate category
    const category = await Category.findOne({ name }).lean().exec()

    if (category) {
        return res.status(409).json({
            type: 'existingCategory',
            title: 'One Little Problem',
            description: 'This category seems to exist.',
            success: false,
        })
    }

    const categoryObject = { name, description, poster }

    // Create and store new category 
    const newCategory = await Category.create(categoryObject)

    if (newCategory) { //created 
        res.status(201).json({ message: `Category: ${name} successfully created.` })
    } else {
        res.status(400).json({ message: 'Invalid category data received' })
    }
})

// @desc Update a category
// @route PATCH /admin/categories/updateCategory
// @access Private
const updateCategory = asyncHandler(async (req, res) => {
    const { id, name, description, poster } = req.body

    // Confirm data 
    if (!id || !name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the category exist to update?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    // Check for duplicate 
    const duplicate = await Category.findOne({ name }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate category name' })
    }

    category.name = name
    category.description = description
    category.poster = poster

    const updatedCategory = await category.save()

    res.json({ message: `${updatedCategory.name} updated` })
})

// @desc Delete a category
// @route DELETE /admin/categories/deleteCategory
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Category ID Required' })
    }

    // Does the user exist to delete?
    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    const result = await category.deleteOne()

    const reply = `Category ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

// @desc Get Nominees per category
// @route GET /admin/categories/:categoryId/nominees
// @access Private
const getAllNomineesPerCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const nominees = await Nominee.find({ category: req.params.categoryId });
        res.json(nominees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = {
    deleteCategory,
    updateCategory,
    createNewCategory,
    getAllCategories,
    getOneCategory,
    getAllNomineesPerCategory,
}
