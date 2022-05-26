const { nanoid } = require('nanoid');
const fs = require('fs');
const { notes } = require('../../db/db.json');
const router = require('express').Router();
const path = require('path');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    let note = req.body;

    //set random id using nanoid
    note.id = nanoid();

    //if any data in note is incorrect, send 400 error back
    if (!note) {
        res.status(400).send('Add all information and try again.');
    } else {
        notes.push(note);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({notes}, null, 2)
            );
        res.json(notes);
    }
});

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

module.exports = router;