const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public'));
})

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'))
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;