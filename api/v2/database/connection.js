const {Pool} = require('pg');

const connectionData = {
    user: 'isw1f',
    host: 'bdd.inf.udec.cl',
    database: 'isw1f',
    password: 'isw1f',
    port: 5432,
};

const pool = new Pool(connectionData);

exports.query = (text, params) => pool.query(text, params);

exports.pool = pool;