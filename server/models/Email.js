const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Email = mongoose.model('Email', emailSchema)

module.exports = Email
