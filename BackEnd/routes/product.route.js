import express from 'express';
import productController from '../controllers/ProductController.js';
const router = express.Router();

router.get('/restore/:productId', productController.restoreProductById);
router.get('/getAllProduct', productController.getAllProduct);
router.post('/create', productController.create);
router.get('/:productId', productController.getProductByID);
router.put('/:productId', productController.updateProductByID);
router.delete('/:productId', productController.deleteProductById);

// export router
export default router;
