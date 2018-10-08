const {Pool} = require('pg');

const connectionData = {
    user: 'isw1f',
    host: 'bdd.inf.udec.cl',
    database: 'isw1f',
    password: 'isw1f',
    //user: 'qbchsrcx',
    //host: 'baasu.db.elephantsql.com',
    //database: 'qbchsrcx',
    //password: 'gyh9_tV2EREVuUmgk5Rimn_XYGmSIkCl',
    port: 5432,
};

const pool = new Pool(connectionData);

exports.query = (text, params) => pool.query(text, params);
