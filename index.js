const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.error(`Error in runnig the server on ${port} ${err.message}`);
    }
    console.log(`Listening on ${port}`);
})