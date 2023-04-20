module.exports.home = function(req, res) {
    // rendering the content to the screen
    return res.render('home',{
        title:"home"
    });
};

