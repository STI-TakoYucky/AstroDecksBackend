import express from 'express'
const router = express.Router();
import { fetchUserData, getUserById, updateUser} from '../controllers/UserController.js';

router.post('/users', fetchUserData) // push user to db after clerk creates the account
router.get('/users/:id', getUserById) // get the author info of a public deck
router.patch('/users/:id', updateUser) // update user data

export default router