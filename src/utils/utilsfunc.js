const pgSQL = require("../config/dbConnectionPG");
const uuid = require("uuid");

function gerarIdUnico() {
    return uuid.v4();
};

function BuscarCEP(cep) {
    let verCEP = cep;
    const [rows] = pgSQL.query('select nome from especialidade', (err, result, fields));
    console.log(rows);
    return verCEP;
}

module.exports = {
    gerarIdUnico,
    BuscarCEP
}