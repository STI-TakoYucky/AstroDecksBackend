import 'dotenv/config'
import dotenv from "dotenv";
import express from 'express'
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import { connectDB } from './db/connectDB.js';
import DeckRoutes from './routes/DeckRoutes.js'
import cookieParser from "cookie-parser";
import AIRoutes from './routes/AIRoutes.js'

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const app = express() 
app.use(cors({
  origin: process.env.CLIENT_URL, // change this when in dev https://astro-decks.vercel.app/
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json())
const PORT = process.env.PORT || 5000

app.use('/api/protected', AuthRoutes)
app.use('/api', UserRoutes)
app.use('/api/decks', DeckRoutes)
app.use('/api/ai', AIRoutes)

connectDB()


// Start the server and listen on the specified port
app.listen(PORT)