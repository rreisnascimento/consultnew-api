const pgSQL = require("../config/dbConnectionPG");
const adfunc = require("../utils/utilsfunc");

const create = async (req, res) => {
    // const cep = adfunc.BuscarCEP(req.body.cep);
    // return res.status(200).json({ message: cep });

    await pgSQL.query('insert into especialistas (uuid, nome) values ($1, $2)',
        [adfunc.gerarIdUnico(), req.body.nome],
        (error) => {
            if (error) { return res.status(500).json({ message: error }) }
            return res.status(201).json({ message: "Profissional Gerado com Sucesso!"})
        })
}

module.exports = {
    create
}