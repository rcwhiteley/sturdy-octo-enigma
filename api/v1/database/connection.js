const {Pool} = require('pg');

const connectionData = {
    user: 'qbchsrcx',
    host: 'baasu.db.elephantsql.com',
    database: 'qbchsrcx',
    password: 'gyh9_tV2EREVuUmgk5Rimn_XYGmSIkCl',
    port: 5432,
};

const pool = new Pool(connectionData)
pool.query('SELECT * FROM test')
    .then(response => {
        console.log("base de datos conectada.");
    })
    .catch(err => {
        console.log("error al conectar a la base de datos.");
    });

exports.query = (text, params) => pool.query(text, params);
