const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const v1 = require('./api/v1/routes/index');
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());
app.use('/api/v1', v1);

const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("Recibiendo conexiones puerto " + port + ".");
});

