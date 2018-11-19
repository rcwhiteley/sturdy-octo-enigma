const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const v1 = require('./api/v1/routes/index');
const v2 = require('./api/v2/controllers/index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(bodyParser.json());
app.use('/api/v1', v1);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v2', v2);
const port = process.env.PORT || 8081;

app.listen(port, function(){
    console.log("Recibiendo conexiones puerto " + port + ".");
});

