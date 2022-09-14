const mysql = require('mysql2');

const poolConnection = mysql.createPool({
    "user": process.env.APP_BD_USERNAME,
    "password": process.env.APP_BD_PASSWORD,
    "database": process.env.APP_BD_NAME,
    "host": process.env.APP_BD_HOSTNAME,
    "port": process.env.APP_BD_PORTA
});

exports.poolConnection = poolConnection;