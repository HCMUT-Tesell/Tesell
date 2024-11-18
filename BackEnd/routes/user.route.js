import express from 'express';
import userController from '../controllers/UserController.js';
const router = express.Router();

router.get('/restore/:userId', userController.restoreUserById);
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.get('/getAllUser', userController.getAllUser);
router.get('/:userId', userController.getUserByID);
router.put('/:userId', userController.updateUserByID);
router.delete('/:userId', userController.deleteUserById);

// export router
export default router;
