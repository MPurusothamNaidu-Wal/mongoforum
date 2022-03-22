const { body, validationResult } = require('express-validator');
const forum = require('../models/forum');
function getforum(req, res) {
  forum.find((err, forums_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(forums_list);
    }
  });
}
const createforum = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('min should be 3 and max length to be 100'),
  body('forum_body')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('in range of 50 to 100 characters'),
  body('author')
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5, max: 50 })
    .withMessage('In range of 5 and 50'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { title, forum_body, doc, author } = req.body;
      let forumObject = new forum({ title, forum_body, doc, author });
      forumObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding forum complete' });
        }
      });
    }
  },
];
function deleteforum(req, res) {
  forum.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`forum with _id as ${req.params.id} is removed`);
    }
  });
}
const editforum = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage('Title length should be minimum 10 to 100 characters'),
  body('forum_body')
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage('Forum body must contain minimum 50 to 500 characters'),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage('No special characters')
    .isLength({ min: 5, max: 50 })
    .withMessage('Author name must be within 5 to 50 characters'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let newforum = { $set: req.body };
      console.log(newforum);
      let { title, forum_body, doc, author } = req.body;
      forum.findByIdAndUpdate(req.params.id, newforum, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json(`Forum with id ${req.params.id} updated successfully.`);
        }
      });
    }
  },
];
module.exports = { getforum, createforum, deleteforum, editforum };
