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
        type: String
    },
    savedDecks: {
        type: []
    }
}, { strict: false, timestamps: true });

export const UserModel = mongoose.model('User', userSchema);