const pg = require("pg");

const dbConnectionPG = new pg.Client({
    user: process.env.APP_BD_USERNAME,
    database: process.env.APP_BD_NAME,
    port: process.env.APP_BD_PORTA,
    host: process.env.APP_BD_HOSTNAME,
    password: process.env.APP_BD_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    } 
});

dbConnectionPG.connect((error) => {
    if (error) {
        console.log("Problemas ao Conectar com Banco" + error)
    } else {
        console.log("Conexão realizada com Sucesso!")
    }     
})

module.exports = dbConnectionPG;