import express from 'express';
import orderDetailController from '../controllers/OrderDetailController.js';
const router = express.Router();

router.get('/restore/:orderDetailId', orderDetailController.restoreOrderDetailById);
// router.get('/getAllorderDetail', orderDetailController.getAllOrderDetail);
router.post('/create', orderDetailController.createOrderDetail);
router.get('/:orderDetailId', orderDetailController.getOrderDetailByID);
router.put('/:orderDetailId', orderDetailController.updateOrderDetailByID);
router.delete('/:orderDetailId', orderDetailController.deleteOrderDetailById);

// export router
export default router;