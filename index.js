const express = require('express');

// require express-ejs-layouts
const expressLayout = require('express-ejs-layouts');


const app = express();
const port = 8000;
app.use(express.static('./assets'));
// extracting styles and script from the sub pages into layout files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express-ejs-layouts
app.use(expressLayout);

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