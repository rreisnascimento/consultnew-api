const pgSQL = require("../config/dbConnectionPG");
const adfunc = require("../utils/utilsfunc");

// comercial, celular, email

const create = async (req, res) => {
    const sql = `insert into precadastro 
                    (uuid, nome, clinica, especialidade, cep, endereco, complemento, bairro, cidade, uf, 
                     fonecomercial, fonecelular, email, created, aceito) 
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, now(), 0)`;
   
    const values = [
        adfunc.gerarIdUnico(), 
        req.body.nome,
        req.body.clinica,
        req.body.especialidade,
        req.body.cep,
        req.body.endereco,
        req.body.complemento,
        req.body.bairro,
        req.body.cidade,
        req.body.uf,
        req.body.comercial,
        req.body.celular,
        req.body.email]

    await pgSQL.query(sql, values,
        (error) => {
            if (error) { return res.status(500).json({ 
                status: 500,
                message: error 
            }) }
            return res.status(201).json({ 
                status: 201,
                message: "Pré Cadastro realizado com Sucesso!"
            })
        })
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