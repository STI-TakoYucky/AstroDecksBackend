import express from 'express'
const router = express.Router()
import { getCommunityDecks, pushDeckToDB, fetchDecks, updateDeck, deleteDeck, getSingleDeck } from '../controllers/DeckController.js'

router.get('/', getCommunityDecks) // get all the public decks
router.get('/deck/:id', getSingleDeck) // get a single deck
router.post('/', pushDeckToDB) // push a deck 
router.get('/:id', fetchDecks) // fetch user decks
router.patch('/:id', updateDeck) // update a user's deck
router.delete('/:id', deleteDeck) // delete a user's single deck

export default router