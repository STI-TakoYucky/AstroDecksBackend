import express from 'express'
const router = express.Router();
import { signUp, verifyEmail, verifyUsername, authenticateToken, signIn } from '../controllers/AuthController.js';
import UserAuthModel from '../models/UserAuthModel.js';

router.post('/verify-email', verifyEmail)
router.post('/verify-username', verifyUsername)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await UserAuthModel.findById(req.user.id).select("-passwordHash");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
});

export default router