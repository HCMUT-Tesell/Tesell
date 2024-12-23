import express from 'express';
import paymentController from '../controllers/PaymentController.js';
const router = express.Router();

router.post('/create', paymentController.initPayment)


export default router;