const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const v1 = require('./api/v1/routes/index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(bodyParser.json());
app.use('/api/v1', v1);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("Recibiendo conexiones puerto " + port + ".");
});

