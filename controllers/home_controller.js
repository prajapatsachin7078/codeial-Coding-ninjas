module.exports.home = function(req, res) {
    // return res.send('<h1>Express is up for Codial!</h1>');
    // rendering the content to the screen
    return res.render('home',{
        title:"home"
    });
};

