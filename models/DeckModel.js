import mongoose from "mongoose"

const cardSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    }
})

export const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    authorID: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        required: true
    },
    cards: {
        type: [cardSchema],
        default: []
    }
}, {timestamps: true})

export const DeckModel = mongoose.model('Deck', deckSchema)
