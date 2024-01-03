import express from 'express'
import { createListing, deleteList, UpdateListing, getList, getLists } from '../controllers/listing.controller.js';
import { verifyToken } from '../error/verifyuser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteList);
router.post('/update/:id', verifyToken, UpdateListing);
router.get('/get/:id', getList);
router.get('/get', getLists);
export default router;