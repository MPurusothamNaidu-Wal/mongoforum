const { body, validationResult } = require('express-validator');
const author = require('../models/author');
function getauthors(req, res) {
  author.find((err, authors_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(authors_list);
    }
  });
}
const createauthor = [
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      console.log(req.body);
      let { first_name, last_name, dob, dod } = req.body;
      let authorObject = new author({ first_name, last_name, dob, dod });
      authorObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: 'adding author complete' });
        }
      });
    }
  },
];
function deleteauthor(req, res) {
  author.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`author with _id as ${req.params._id} is removed`);
    }
  });
}
module.exports = { getauthors, createauthor, deleteauthor };
