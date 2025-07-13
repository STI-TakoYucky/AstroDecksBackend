import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import { connectDB } from './db/connectDB.js';
import DeckRoutes from './routes/DeckRoutes.js'

const app = express() 
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000

app.use('/api/protected', AuthRoutes)
app.use('/api', UserRoutes)
app.use('/api/decks', DeckRoutes)

connectDB()

// await UserModel.updateMany(
//     {
//         $or: [
//             { decks: { $exists: false} },
//             { savedDecks: { $exists: false} },
//             { username: {$exists: false}},
//             { imageURL: {$exists: false}}
//         ]
//     },
//     {
//         $set: {
//             decks: [],
//             savedDecks: [],
//             username: "",
//             imageURL: ""
//         }
//     }
// )


// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})