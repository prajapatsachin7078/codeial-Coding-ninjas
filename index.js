const express = require('express');
const app = express();
const port = 8000;

// use ejs as a view engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('views','./views');

// use express router
app.use('/',require('./routes/'));

app.listen(port, function(err){
    if(err){
        console.error(`Error in runnig the server on ${port} ${err.message}`);
    }
    console.log(`Listening on ${port}`);
})