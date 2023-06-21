const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        }
      })
      .exec();

    const users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log("Error fetching posts:", err);
    // Handle the error appropriately (e.g., send an error response)
  }
};
