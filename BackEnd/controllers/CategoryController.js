import mongoose from 'mongoose';
import Category from '../models/Category.model.js';
import Product from '../models/Product.model.js';


class CategoryController {
    // [GET] /api/category/getAllCategory
    async getAllCategory (req, res) {
        try {
            const categoryList = await Category.find();

            const countProductbyCategory = Promise.all(categoryList.map(async category => {
                const countProduct = await Product
                  .find({ category: category._id })
                  .countDocuments()
          
                return countProduct;
            }))

            const countProduct = await countProductbyCategory;

            if (!categoryList) {
                return res.status(404).json({
                  message: 'Loi o categoryList trong getAllCategory'
                })
            }

            const listCategory = categoryList.map((category, index) => {
                return {
                  ...category._doc,
                  countProduct: countProduct[index]
                }
              })
          
              return res.status(200).json(listCategory);

        } catch (error) {
            console.error(error)
            console.log('Loi o getAllCategory')
        }
    }
    // [POST] /api/category/create
    async createCategory(req, res) {
        const { categoryName, imageUrl, categoryType} = req.body;
        try {
            const existCategory = await Category.findOne({ categoryName })
            const existCategoryType = await Category.findOne({ categoryType })
            
            if (existCategory && existCategoryType) {
                return res.status(400).json({
                    message: 'Category da ton tai',
                })
            }
            
            const newCategory = new Category({
                categoryName,
                imageUrl,
                categoryType,
            })
            
            await Category.create(newCategory)
            console.log('Create new category ' + categoryName)
            res.json({
                message: 'Create Category successfully'
            })

        } catch (error) {
            console.error(error)
            console.log('Loi xay ra o createCategory')
        }
    }
    //[GET] /api/category/getIdCategoryByName
    async getIdCategoryByName(categoryName) {
        try {
            const category = await Category.findOne({ categoryName });
            return category ? category._id : null;
        } catch (error) {
            throw new Error('Error finding category by name: ' + error.message);
        }
    }
    //[GET] /api/category/:categoryId
    async getCategoryByID (req, res) {
        const categoryId = req.params.categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ 
                message: 'categoryId ID is not valid',
                receivedId: categoryId 
            });
        }
        try {
            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json('categoryId ID is not found')
            }

            return res.status(200).json(category)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getCategoryByID!' });
        }
    }
    //[PUT] /api/category/:categoryId
    async updateCategoryByID (req, res) {
        const categoryId = req.params.categoryId;
        // console.log(userId)
        const { categoryName, imageUrl, categoryType } = req.body;
        console.log(categoryName)
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json('categoryId ID is not valid')
        }
        if (!categoryName) {
            return res.status(400).json('categoryId Name is required');
        }

        try {
            const newCategory = { categoryName, imageUrl, categoryType }
            console.log("toi duoc truoc hanh dong update")
            const category = await Category.findByIdAndUpdate(
                categoryId,
                newCategory,
                { new: true }
            )

            if (!category) {
                return res.status(400).json('category cannot be update!')
            }

            return res.status(200).json(category)

        } catch (error) {
            return res.status(500).json({
                message: 'Error in updatecategoryById here',
                error
            })
        }
    }
    //[DELETE] /api/category/:categoryId
    async deleteCategoryById (req, res) {
        const categoryId = req.params.categoryId;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json('categoryId ID is not valid')
        }

        try {
            const category = await Category.delete({ _id: categoryId });

            if (!category) {
                return res.status(404).json('categoryId ID is not found');
            }

            return res.status(200).json('Delete categoryId Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in deletecategoryById',
                error
            })
        }
    }
    //[GET] /api/category/restore/:categoryId
    async restoreCategoryById (req, res) {
        const categoryId = req.params.categoryId;
        console.log(categoryId)
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json('Product ID is not valid')
        }

        try {
            const category = await Category.restore({ _id: categoryId });

            if (!category) {
                return res.status(404).json('categoryId ID is not found');
            }

            return res.status(200).json('Restore categoryId Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in restorecategoryById',
                error
            })
        }
    }
}

export default new CategoryController();
