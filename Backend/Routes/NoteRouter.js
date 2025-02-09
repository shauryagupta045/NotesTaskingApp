const router = require('express').Router();
const { getNotes, addNote, deleteNote } = require('../Controllers/NoteController');
const ensureAuthenticated = require('../Middlewares/Auth');

router.get('/notes', ensureAuthenticated, getNotes);
router.post('/notes', ensureAuthenticated, addNote);
router.delete('/notes/:id', ensureAuthenticated, deleteNote);

module.exports = router;