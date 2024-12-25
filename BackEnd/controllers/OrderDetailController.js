import mongoose from 'mongoose';
import OrderDetail from "../models/OrderDetail.model.js";


class OrderDetailController {
    // [GET] /api/orderDetail/getAllOrderDetail
    async getAllOrderDetail(req, res) {
        try {
            // Lấy các tham số từ query params
            const { 
                page = 1, 
                limit = 10, 
                sort, 
                quantityMin, 
                quantityMax
            } = req.query;

            // Tạo query tìm kiếm
            const query = {};

            // Lọc theo số lượng (quantity)
            if (quantityMin || quantityMax) {
                query.quantity = {};
                if (quantityMin) query.quantity.$gte = Number(quantityMin);
                if (quantityMax) query.quantity.$lte = Number(quantityMax);
            }

            // Sắp xếp (sort)
            let sortOption = {};
            if (sort) {
                const sortFields = {
                    'quantity_asc': { quantity: 1 },  
                    'quantity_desc': { quantity: -1 },
                };
                sortOption = sortFields[sort] || {};  // Nếu không có kiểu sort, thì không sắp xếp.
            }

            // Truy vấn dữ liệu từ OrderDetail
            const orderDetails = await OrderDetail.find(query)
                .sort(sortOption) // Sắp xếp
                .skip((page - 1) * limit) // Phân trang
                .limit(Number(limit)) // Giới hạn số lượng kết quả

            // Tính tổng số lượng kết quả
            const totalOrderDetails = await OrderDetail.countDocuments(query);

            // Trả về kết quả
            return res.status(200).json({
                total: totalOrderDetails,  // Tổng số lượng order details
                page: Number(page),        // Trang hiện tại
                limit: Number(limit),      // Số lượng mỗi trang
                orderDetails               // Dữ liệu order details
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra khi lấy thông tin OrderDetails!' });
        }
    }
    // [POST] /api/orderDetail/create
    async createOrderDetail(req, res) {
        try {
            const { quantity, product } = req.body;
            // produc = productId tham chieu toi schema product
            if (!quantity || !product) {
              return res.status(400).json({ success: false, message: 'Missing required fields' });
            }
        
            const newOrderDetail = new OrderDetail({
              quantity,
              product,
            });
        
            await newOrderDetail.save();
        
            return res.status(201).json({
              success: true,
              message: 'OrderDetail created successfully',
              data: newOrderDetail,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: 'Internal Server Error',
            });
          }
    }
    //[GET] /api/orderDetail/:orderDetailId
    async getOrderDetailByID (req, res) {
        const orderDetailId = req.params.orderDetailId
        if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
            return res.status(400).json({ 
                message: 'orderDetailId ID is not valid',
                receivedId: orderDetailId 
            });
        }
        try {
            const orderDetail = await OrderDetail.findById(orderDetailId);

            if (!orderDetail) {
                return res.status(404).json('orderDetailId ID is not found')
            }

            return res.status(200).json(orderDetail)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getorderDetailById!' });
        }
    }
    //[PUT] /api/orderDetail/:orderDetailId
    async updateOrderDetailByID (req, res) {
        const orderDetailId = req.params.orderDetailId;
        // console.log(userId)
        const { quantity, product } = req.body;
        // console.log(productName)
        if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
            return res.status(400).json('orderDetailId ID is not valid')
        }
        if (!product) {
            return res.status(400).json('ProductId is required');
        }
        if (!quantity) {
            return res.status(400).json('quantity is required');
        }
        try {
            const newOrderDetail = {
                quantity,
                product,
            }
            console.log("toi duoc truoc hanh dong update")
            const orderDetail = await OrderDetail.findByIdAndUpdate(
                orderDetailId,
                newOrderDetail,
                { new: true }
            )

            if (!orderDetail) {
                return res.status(400).json('orderDetail cannot be update!')
            }

            return res.status(200).json({status: true, message: 'Order updated successfully', orderDetail})

        } catch (error) {
            return res.status(500).json({
                message: 'Error in updateProductById here',
                error
            })
        }    
    }
    
    //[DELETE] /api/orderDetail/:orderDetailId
    async deleteOrderDetailById (req, res) {
        const orderDetailId = req.params.orderDetailId;
        if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
            return res.status(400).json('categoryId ID is not valid')
        }

        try {
            const orderDetail = await OrderDetail.delete({ _id: orderDetailId });

            if (!orderDetail) {
                return res.status(404).json('orderDetailId ID is not found');
            }

            return res.status(200).json('Delete orderDetailId Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in deleteorderDetailById',
                error
            })
        }
    }
    //[GET] /api/orderDetail/restore/:orderDetailId
    async restoreOrderDetailById (req, res) {
        const orderDetailId = req.params.orderDetailId;
        console.log(orderDetailId)
        if (!mongoose.Types.ObjectId.isValid(orderDetailId)) {
            return res.status(400).json('Product ID is not valid')
        }

        try {
            const orderDetail = await OrderDetail.restore({ _id: orderDetailId });

            if (!orderDetail) {
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

export default new OrderDetailController();
