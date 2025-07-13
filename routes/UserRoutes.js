import express from 'express'
const router = express.Router();
import { pushUserToDB, getUserById} from '../controllers/UserController.js';

router.post('/users', pushUserToDB) // push user to db after clerk creates the account
router.get('/users/:id', getUserById) // get the author info of a public deck

export default router