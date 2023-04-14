const Category = require('../../models/Category');
const Nominee = require('../../models/Nominee');
const asyncHandler = require('express-async-handler');

// @desc Get all categories
// @route GET /categories/allCategories
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
// @route GET /categories/all:categoryId
// @access Private
const getOneCategory = asyncHandler(async (req, res) => {
    const id = req.params.categoryId;

    const category = await Category.findById(id).exec()

    if (!category) {
        return res.status(400).json({ message: 'Category not found' })
    }

    res.status(200).json(category)

})


// @desc Get Nominees per category
// @route GET /categories/:categoryId/nominees
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
    getAllCategories,
    getOneCategory,
    getAllNomineesPerCategory,
}
