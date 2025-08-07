import { DeckModel } from "../models/DeckModel.js"


export const getCommunityDecks = async (req, res) => {
    try {
        const decks = await DeckModel.find({public: true})
        return res.status(200).json(decks)
    } catch (error) {
        res.status(500).json({message: "Unknown Server Error"})
    }
}

export const fetchDecks = async (req, res) => {
    const { id } = req.params
    try {
        const decks = await DeckModel.find({ authorID: id });
        return res.status(200).json(decks);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const pushDeckToDB = async (req, res) => {
    //deckData is an object {...}
    const deckData = req.body

    try {
        const newDeck = await DeckModel.create(deckData)
        return res.status(201).json(newDeck)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateDeck = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const updatedDeck = await DeckModel.findByIdAndUpdate({_id: id}, data, {new: true})
        return res.status(200).json(updatedDeck)
    } catch (error) {
        return res.status(500).json({
        message: "Failed to updated the deck",
        error: error.message || "Unknown error",
        });
    }
}

export const deleteDeck = async (req, res) => {
    const { id } = req.params
    try {
        await DeckModel.deleteOne({_id: id})
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({message: "Failed to delete deck"})
    }
}

export const getSingleDeck = async (req, res) => {
    const { id } = req.params
    try {
        const deck = await DeckModel.findById(id)
        return res.status(200).json(deck)
    } catch (error) {
        return res.status(404).json({message: "Failed to get deck"})
    }
}