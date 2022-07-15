import express from 'express';
import { deleteUser, followUser, getUser, getUsers, unFollowUser, updateUser } from '../Controllers/UserController.js';

const router = express.Router()

router.get('/',getUsers)
router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unFollowUser)

export default router