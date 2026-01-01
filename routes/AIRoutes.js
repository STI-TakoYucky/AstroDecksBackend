import express from 'express'
const router = express.Router()
import multer from "multer"
import { convertPDF } from '../controllers/AIController.js'

const upload = multer({ dest: "uploads/" })

router.post('/convert-pdf', upload.array("files"),  convertPDF)

export default router