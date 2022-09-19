const pgSQL = require("../config/dbConnectionPG");
const adfunc = require("../utils/utilsfunc");

const create = async (req, res) => {
    return res.status(200).json({ message: req.body });
    // const sql = `insert into precadastro 
    //                 (uuid, nome, especialidade, endereco, complemento, bairro, cidade, uf, created, aceito) 
    //             values ($1, $2, $3, $4, $5, $6, $7, $8, now(), 0)`;
   
    // const values = [
    //     adfunc.gerarIdUnico(), 
    //     req.body.nome,
    //     req.body.especialidade,
    //     req.body.endereco,
    //     req.body.complemento,
    //     req.body.bairro,
    //     req.body.cidade,
    //     req.body.uf]

    // await pgSQL.query(sql, values,
    //     (error) => {
    //         if (error) { return res.status(500).json({ message: error }) }
    //         return res.status(201).json({ message: "Pré Cadastro realizado com Sucesso!"})
    //     })
}

const all = async (req, res) => {
    await pgSQL.query('select * from precadastro where aceito=0 order by created', (error, response) => {
        if (error) { return res.status(500).json({ message: error }) };
        let dataJSON = {
            "rowcCunt": response.rowCount,
            "data": response.rows
        }        
        return res.status(200).json( dataJSON );
    });
}

module.exports = { 
    create,
    all
};