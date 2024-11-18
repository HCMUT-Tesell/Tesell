// const Product = require('../models/Product.model');
// const mongoose = require('mongoose');

import mongoose from 'mongoose';
import Product from '../models/Product.model.js';

class ProductController {
    //[GET] /api/product/getAllProduct
    async getAllProduct (req, res) {
        try {
            const { page = 1, limit = 10 } = req.query; // Nhận query params cho phân trang
            const productList = await Product.find()
                .skip((page - 1) * limit) // Bỏ qua các bản ghi trước đó
                .limit(Number(limit));   // Lấy giới hạn số bản ghi
            return res.status(200).json(productList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getAllProduct!' });
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
        console.log("o ham ProductCreate" + productName + description)
    
        try {
            const existProduct = await Product.findOne({ productName });
            if (existProduct) {
                return res.status(400).json({ message: 'Product đã tồn tại!' }); 
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
            console.log("toi duoc truoc hanh dong update")
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
