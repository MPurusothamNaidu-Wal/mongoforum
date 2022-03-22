var express = require('express');
var router = express.Router();
var authorsController = require('../controllers/author');
router.get('/', authorsController.getauthors);
router.post('/', authorsController.createauthor);
router.delete('/:_id', authorsController.deleteauthor);
module.exports = router;
