import Order from '../models/Order.model.js';
import User from '../models/User.model.js';

class OrderController {
    // [POST] api/order/create
    async createOrder(req, res) {
        try {
            const { user, orderDetail, shippingAddress, city, country, phone, note, totalPrice, status, predictedShippedDate, actualShippedDate } = req.body;

            // Kiểm tra thông tin cần thiết
            // Check necessary ìnormation
            if (!user || !orderDetail || !shippingAddress || !city || !country || !phone || !status) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            const newOrder = new Order({
                user,
                orderDetail,
                shippingAddress,
                city,
                country,
                phone,
                note,
                totalPrice,
                status,
                predictedShippedDate,
                actualShippedDate
            });

            // Lưu đơn hàng mới vào cơ sở dữ liệu
            // databse save
            const savedOrder = await newOrder.save();
            return res.status(201).json({ message: 'Order created successfully', order: savedOrder });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating order' });
        }
    }

    // [GET] api/order/getAllOrder
    async getAllOrder(req, res) {
        try {
            const { page = 1, limit = 100, sort, userName, status } = req.query;

            // Tạo query tìm kiếm
            // Query for search and filter
            const query = {};
            // status filter
            if (status) {
                // console.log(status);
                if (!Array.isArray(status)) query.status = status;
                else query.status = {"$in":status}
            }
                // query.status = status;

            // Sắp xếp
            // Sort
            let sortOption = {};
            if (sort) {
                const sortFields = {
                    'date_asc': { dateOrdered: 1 },
                    'date_desc': { dateOrdered: -1 },
                    'price_asc': { totalPrice: 1 },
                    'price_desc': { totalPrice: -1 }
                };
                sortOption = sortFields[sort] || {};
            }

            if (userName) {
                // Tìm userId theo userName
                let user;
                try {
                    user = await User.findOne({ lastName: userName });

                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    query.user = user._id; // Thêm userId vào query
                } catch (error) {
                    return res.status(500).json({ message: `Error finding user by userName: ${error.message}` });
                }
            }

            // console.log(query)
            // Phân trang
            //Pagination
            const orders = await Order.find(query)
                .sort(sortOption)
                .skip((page - 1) * limit)
                .limit(Number(limit));

            const totalOrders = await Order.countDocuments(query);

            return res.status(200).json({
                total: totalOrders,
                page: Number(page),
                limit: Number(limit),
                orders: orders
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching orders' });
        }
    }

    // [GET] api/order/:orderId
    async getOrderByID(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await Order.findById(orderId).populate('orderDetail');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json({ order });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching order' });
        }
    }

    // [PUT] api/order/:orderId
    async updateOrderByID(req, res) {
        try {
            const orderId = req.params.orderId;
            const updateData = req.body;

            const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({ status: true, message: 'Order updated successfully', order: updatedOrder });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: 'Error updating order' });
        }
    }

    // [DELETE] api/order/:orderId
    async deleteOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const deletedOrder = await Order.delete({ _id: orderId });
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting order' });
        }
    }

    // [GET] api/order/restore/:orderId
    async restoreOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const restoredOrder = await Order.restore({ _id: orderId });
            if (!restoredOrder) {
                return res.status(404).json({ message: 'Order not found or cannot be restored' });
            }

            return res.status(200).json({ message: 'Order restored successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error restoring order' });
        }
    }

    // [GET] api/order/user/:userID
    async getOrderByUserID(req, res) {
        try {
            const userID = req.params.userID;
            const order = await Order.findOne({user: userID, status: "selecting"});
            //
            if (!order) {
                const user = await User.findById(userID);

                const newOrder = new Order({
                    user: userID,
                    orderDetail: [],
                    phone: user.phone,
                    status: "selecting"
                }) 
                
                try {
                    const savedOrder = await newOrder.save();
                    
                    console.log(savedOrder._id);
                    return res.status(200).json({
                        order: savedOrder
                    })

                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Error creating order' });
                }
            }

            return res.status(200).json({
                order
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error fetching order' });
        }
    }

    // [GET] api/order/user/:userID/all/
    async getAllOrderOfUserId(req, res) {
        try {
            const userID = req.params.userID;
            const order = await Order.find({user: userID}).sort({ dateOrdered: -1 });
            // console.log(order);
            return res.status(200).json({
                success: true,
                orders: order
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Error fetching order' });
        }
    }
}

export default new OrderController();
