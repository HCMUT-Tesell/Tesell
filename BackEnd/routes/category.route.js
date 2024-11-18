import express from 'express';
import categoryController from '../controllers/CategoryController.js';
const router = express.Router();

router.get('/restore/:categoryId', categoryController.restoreCategoryById);
router.get('/getAllCategory', categoryController.getAllCategory);
router.post('/create', categoryController.createCategory);
router.get('/:categoryId', categoryController.getCategoryByID);
router.put('/:categoryId', categoryController.updateCategoryByID);
router.delete('/:categoryId', categoryController.deleteCategoryById);

// export router
export default router;