import mongoose from 'mongoose';
import OrderDetail from "../models/OrderDetail.model.js";


class OrderDetailController {
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

            return res.status(200).json(orderDetail)

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
