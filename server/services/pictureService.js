const Picture = require("../models/Picture");

exports.getById = (id) => Picture.findById(id).populate('author')
exports.getAll = () => Picture.find().populate("author");
exports.create = (author, url) => Picture.create({ author, url });
exports.delete = async (pictureId, userId) => {
  const picture = await Picture.findOne({ _id: pictureId, userId });

  if (!picture) {
    throw { message: "Picture not found or not owned by user" };
  }
  await picture.deleteOne({ _id: picture._id });
};

exports.getAllPicturesPerUser = async () => {
  const pictures = await Picture.find()
    .sort({ createdAt: -1 })
    .populate("author", "email")
    .exec();

  const picturesByAuthor = pictures.reduce((acc, cur) => {
    const authorName = cur.author.email;
    if (!acc[authorName]) {
      acc[authorName] = [];
    }
    acc[authorName].push(cur);
    return acc;
  }, {});

  const sortedPicturesByAuthor = Object.entries(picturesByAuthor)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([author, pictures]) => ({
      author,
      pictures: pictures.sort((a, b) => b.createdAt - a.createdAt),
    }));
  return sortedPicturesByAuthor;
};

exports.getForUser = async (userId) => {
  return await Picture.find({ userId }).sort({ createdAt: -1 });
};
