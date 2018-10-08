const {Pool} = require('pg');

const connectionData = {
    user: 'iswf',
    host: 'bdd.inf.udec.cl',
    database: 'iswf',
    password: 'iswf',
    //user: 'qbchsrcx',
    //host: 'baasu.db.elephantsql.com',
    //database: 'qbchsrcx',
    //password: 'gyh9_tV2EREVuUmgk5Rimn_XYGmSIkCl',
    port: 5432,
};

const pool = new Pool(connectionData);
{ result } = pool.query("select * from pasajero");

exports.query = (text, params) => pool.query(text, params);
