import express from 'express'
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

// SAMPLE CREATE USER API, CAN BE DELETED
router.post('/', createUser)
// ##########################################################

export default router;