import express from 'express';
import orderController from '../controllers/OrderController.js';
const router = express.Router();

router.get('/restore/:orderId', orderController.restoreOrderById);
router.get('/user/:userID/all', orderController.getAllOrderOfUserId)
router.get('/user/:userID', orderController.getOrderByUserID)
router.get('/getAllOrder', orderController.getAllOrder);
router.post('/create', orderController.createOrder);
router.get('/:orderId', orderController.getOrderByID);
router.put('/:orderId', orderController.updateOrderByID);
router.delete('/:orderId', orderController.deleteOrderById);

// export router
export default router;