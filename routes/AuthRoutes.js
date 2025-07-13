import express from 'express'
const router = express.Router();
import { requireAuth } from '@clerk/express'
import { authenticateUser } from '../controllers/AuthController.js';

// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
router.get('/', requireAuth(), authenticateUser)

export default router