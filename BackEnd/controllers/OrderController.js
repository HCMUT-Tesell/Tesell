

class OrderController {
    // [POST] api/order/create
    async createOrder(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }

    // [GET] api/order/getAllOrder
    async getAllOrder(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }

    // [GET] api/order/:orderId
    async getOrderByID(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }

    // [PUT] api/order/:orderId
    async updateOrderByID(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }

    // [DELETE] api/order/:orderId
    async deleteOrderById(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }

    // [GET] api/order/restore/:orderId
    async restoreOrderById(req, res) {
        return res.status(200).json({
            message: "success router"
        })
    }
}

export default new OrderController();
