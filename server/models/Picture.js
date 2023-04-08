const mongoose = require("mongoose");

const MAX_IMAGES_PER_USER = 10;

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const pictureSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

pictureSchema.pre("save", async function (next) {
  const authorId = this.author;
  const count = await this.constructor.countDocuments({ author: authorId });

  if (count >= MAX_IMAGES_PER_USER) {
    const error = new Error(
      `User with ID ${authorId} has already uploaded the maximum number of pictures.`
    );
    error.statusCode = 400;
    return next(error);
  }

  next();
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
