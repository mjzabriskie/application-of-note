const { nanoid } = require('nanoid');
const fs = require('fs');
const { notes } = require('../../db/db.json');
const router = require('express').Router();
const path = require('path');

//api endpoint to get notes from db.json
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

//api endpoint to delete specific note from db.json
router.delete('/notes/:id', (req, res) => {
    const result = req.params.id;
    if (result) {
        const filteredArray = notes.filter(note => note.id !== result);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({notes: filteredArray}, null, 2)
            );
        res.json(filteredArray);
    } else {
        res.send(404);
    }
});

//api route to add note to db.json
router.post('/notes', (req, res) => {
    let note = req.body;

    //set random id using nanoid
    note.id = nanoid();

    //if data in note is missing, send 400 error back
    if (!note) {
        res.status(400).send('Add all information and try again.');
    } else {//pushes new note to notes object for live view, and updates the db file
        notes.push(note);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({notes}, null, 2)
            );
        res.json(notes);
    }
});

module.exports = router;