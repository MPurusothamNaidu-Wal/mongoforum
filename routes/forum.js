var express = require('express');
var router = express.Router();
var forumController = require('../controllers/forum');
router.get('/', forumController.getforum);
router.put('/:id', forumController.editforum);
router.post('/', forumController.createforum);
router.delete('/:id', forumController.deleteforum);
module.exports = router;
