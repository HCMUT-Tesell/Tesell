import mongoose from 'mongoose';
import Category from '../models/Category.model.js';
import Product from '../models/Product.model.js';
class ProductController {
    //[GET] /api/product/getAllProduct
    // Hàm này sẽ hỗ trợ filter, sort, search
    async getAllProduct (req, res) {
        try {
            const { 
                page = 1, 
                limit = 10, 
                sort, 
                search, 
                brand, 
                category, // category name
                minPrice, 
                maxPrice, 
                rating 
            } = req.query;
            
            // console.log(page)
            // console.log(limit)
            // console.log(sort)
            // console.log(search)
            // console.log(brand)
            // console.log(category)
            // console.log(minPrice)
            // console.log(maxPrice)
            // console.log(rating)

            // Create query
            const query = {};
    
            // Search 
            if (search) {
                query.productName = { $regex: search, $options: 'i' }; 
            }
    
            // Filter brand
            if (brand) {
                query.brand = brand;
            }

            // Filter Category
            if (category) {
                // get categoryId by category name before filter
                let categoryId;
                try {
                    categoryId = await Category.findOne({ categoryName: category });
                    // console.log(categoryId);
                    // console.log(categoryId._id);
                    if (!categoryId) {
                        return res.status(404).json({ message: 'CategoryId not found by Name' });
                    }
                } catch (error) {
                    return res.status(500).json({ message: `Error in finding category ID by category name: ${error.message}` });
                }
                // Filter category by category(name)
                if (categoryId) {
                    query.category = category;
                }
            }
        
            // Filter
            if (minPrice || maxPrice) {
                query.sellPrice = {};
                if (minPrice) query.sellPrice.$gte = Number(minPrice); 
                if (maxPrice) query.sellPrice.$lte = Number(maxPrice); 
            }
    
            // Filter rating
            if (rating) {
                query.rating = { $gte: Number(rating) }; 
            }
    
            // sort
            let sortOption = {};
            if (sort) {
                const sortFields = {
                    'price_asc': { sellPrice: 1 },  
                    'price_desc': { sellPrice: -1 }, 
                    'rating': { rating: -1 },       
                    'newest': { createdAt: -1 },    
                };
                sortOption = sortFields[sort] || {}; 
            }
    
            // Pagination
            const productList = await Product.find(query)
                .sort(sortOption) 
                .skip((page - 1) * limit) 
                .limit(Number(limit));   
    
            const totalProducts = await Product.countDocuments(query);
    
            return res.status(200).json({
                total: totalProducts,     
                page: Number(page),       
                limit: Number(limit),     
                products: productList     
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi lấy getAllProduct!' });
        }
    }
    //[POST] /api/product/create
    async create (req, res) {
        const { 
            productName, 
            description,
            image, 
            imageUrl,
            buyPrice,
            sellPrice,
            category,
            stockProductCount,
            storedProduct,
            rating,
            numberReviews,
            isFeature,
            brand } = req.body;
        console.log("o ham ProductCreate" + productName)
    
        try {
            const existProduct = await Product.findOne({ productName });
            if (existProduct) {
                return res.status(400).json({ message: 'Product đã tồn tại!' }); 
            }

            const isExistCategory = await Category.findOne({categoryName: category});
            if (!isExistCategory) {
                return res.status(400).json({ message: 'Category không tồn tại' }); 
            }
    
            const newProduct = new Product({
                productName,
                description,
                image,
                imageUrl,
                buyPrice,
                sellPrice,
                category,
                stockProductCount,
                storedProduct,
                rating,
                numberReviews,
                isFeature,
                brand
            });
    
            await newProduct.save();
    
            console.log("Product created:", productName);
            res.json({ message: 'Tạo Product thành công!' });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi tạo Product!' });
        }
    }
    //[GET] /api/product/:productId
    async getProductByID (req, res) {
        const productId = req.params.productId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ 
                message: 'Product ID is not valid',
                receivedId: productId 
            });
        }
        try {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json('Product ID is not found')
            }

            return res.status(200).json(product)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getProductByID!' });
        }
    }
    //[PUT] /api/product/:productId
    async updateProductByID (req, res) {
        const productId = req.params.productId;
        // console.log(userId)
        const {
            productName, 
            description,
            image, 
            imageUrl,
            buyPrice,
            sellPrice,
            category,
            stockProductCount,
            storedProduct,
            rating,
            numberReviews,
            isFeature,
            brand } = req.body;
        console.log(productName)
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json('Product ID is not valid')
        }
        if (!productName) {
            return res.status(400).json('Product Name is required');
        }

        try {
            const newProduct = {
                productName,
                description,
                image,
                imageUrl,
                buyPrice,
                sellPrice,
                category,
                stockProductCount,
                storedProduct,
                rating,
                numberReviews,
                isFeature,
                brand
            }
            // console.log("toi duoc truoc hanh dong update")
            const product = await Product.findByIdAndUpdate(
                productId,
                newProduct,
                { new: true }
            )

            if (!product) {
                return res.status(400).json('Product cannot be update!')
            }

            return res.status(200).json(product)

        } catch (error) {
            return res.status(500).json({
                message: 'Error in updateProductById here',
                error
            })
        }
    }
    //[DELETE] /api/product/:productId
    async deleteProductById (req, res) {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json('User ID is not valid')
        }

        try {
            const product = await Product.delete({ _id: productId });

            if (!product) {
                return res.status(404).json('Product ID is not found');
            }

            return res.status(200).json('Delete Product Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in deleteProductById',
                error
            })
        }
    }
    //[GET] /api/product/restore/:productId
    async restoreProductById (req, res) {
        const productId = req.params.productId;
        console.log(productId)
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json('Product ID is not valid')
        }

        try {
            const product = await Product.restore({ _id: productId });

            if (!product) {
                return res.status(404).json('Product ID is not found');
            }

            return res.status(200).json('Restore Product Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in restoreProductById',
                error
            })
        }
    }
}

// module.exports = new ProductController();
export default new ProductController();
