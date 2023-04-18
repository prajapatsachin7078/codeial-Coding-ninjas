const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.error(`Error in runnig the server on ${port} ${err.message}`);
    }
    console.log(`Listening on ${port}`);
})