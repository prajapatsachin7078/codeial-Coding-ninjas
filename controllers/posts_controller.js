const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success','Post created successfully');
    return res.redirect('back');
  } catch (err) {
    req.flash('error', err);
    // console.log("Error creating post:", err);
    return res.redirect('back');
    // Handle the error appropriately (e.g., send an error response)
  }
};

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success','Post deleted successfully');
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',err);

    console.error(err);
    return res.redirect('back');
  }
};
