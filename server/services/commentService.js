const Picture = require('../models/Picture');
const User = require('../models/User');

async function addComment(pictureId, author, content) {
    console.log(pictureId);
    console.log(author);
    console.log(content);
    const user = await User.findById(author);
  const comment = { 
    author: user._id, 
    email: user.email, 
    content 
  };
  const picture = await Picture.findByIdAndUpdate(
    pictureId,
    { $push: { comments: comment } },
    { new: true }
  );
  return picture;

}

module.exports = { addComment };
