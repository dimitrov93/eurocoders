const User = require("../models/User");

exports.findById = (id) => User.findById(id)
exports.update = (id, data) => User.updateOne({_id: id},{$set: data},{ new: true })
exports.findLastFiveUsers = async () => {
    try {
      const users = await User.find().sort({ createdAt: -1 }).limit(5);
      return users;
    } catch (error) {
      console.error(error);
    }
  };
  