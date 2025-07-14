import mongoose from "mongoose";
import { deckSchema } from "./DeckModel.js";

const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    username: {
        type: String
    },
    imageUrl: {
        type: String,
        default: "https://i.ibb.co/8LXK5mYv/default-profile-picture.png"
    },
    savedDecks: {
        type: []
    }
}, { strict: false, timestamps: true });

export const UserModel = mongoose.model('User', userSchema);