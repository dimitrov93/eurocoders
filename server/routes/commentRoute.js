const express = require('express');
const router = express.Router();
const { addComment } = require('../services/commentService');

router.post('/:pictureId', async (req, res, next) => {
  try {
    const { pictureId } = req.params;
    const { author, content } = req.body;


    const picture = await addComment(pictureId, author, content);
    res.status(201).json(picture);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
