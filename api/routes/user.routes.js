import express from 'express'
import { test, updateUser, deleteUser, UserListings, getUserId } from '../controllers/user.controller.js';
import { verifyToken } from '../error/verifyuser.js';


const router=express.Router();


router.get('/test',test );
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, UserListings);
router.get('/:id',verifyToken, getUserId )
export default router; 