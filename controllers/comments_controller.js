const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post)
    .then(function(post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            }).then(function(comment){
                post.comments.push(comment);
                post.save();
                res.redirect('back');
            })
            .catch(function(err){
                // handle error
            });
        }
    })
    .catch(function(err){

    });
}

// Delete comments 
module.exports.destroy = function(req, res){
    Comment.findById(req.params.id)
        .then(function(comment){
            if(comment.user == req.user.id){
                let postId = comment.post;
                return Comment.deleteOne({ _id: comment._id }).then(function(){
                    return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id }});
                });
            } else {
                throw new Error('User does not have permission');
            }
        })
        .then(function(post){
            res.redirect('back');
        })
        .catch(function(err){
            console.error(err);
            res.redirect('back');
        });
};

