const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pictureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Picture'
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Comments = mongoose.model('Comment', commentsSchema)

module.exports = Comments
