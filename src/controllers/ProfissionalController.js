const pgSQL = require("../config/dbConnectionPG");
const adfunc = require("../utils/utilsfunc");

function filter(filterCEP) {
    pgSQL.query('select nome from especialidade', (error, response) => {
        if (error) { 
            return "Errroooo" 
        } else {
            return "tem dado"
        }
    });
}

const create = async (req, res) => {
    // const cep = adfunc.BuscarCEP(req.body.cep);
    // return res.status(200).json({ message: cep });

    const sql = `insert into profissional 
                    (uuid, nome, especialidade, endereco, complemento, bairro, cidade, uf, created, altered) 
                values ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())`;
    
    const values = [
        adfunc.gerarIdUnico(), 
        req.body.nome,
        req.body.especialidade,
        req.body.endereco,
        req.body.complemento,
        req.body.bairro,
        req.body.cidade,
        req.body.uf]

    await pgSQL.query(sql, values,
        (error) => {
            if (error) { return res.status(500).json({ message: error }) }
            return res.status(201).json({ message: "Profissional Gerado com Sucesso!"})
        })
}

const update = async (req,res) => {
    const uuid = req.params.id;
    const { nome } = req.body;
    await pgSQL.query('update profissional set nome=$1, altered=now() where uuid=$2', 
        [nome, uuid],
        (error) => {
            if (error) { return res.status(500).json({ message: error }) }
            return res.status(200).json({ message: "Profissional Alterado com Sucesso!" })

    })
}

const show = async (req,res) => {
    await pgSQL.query('select * from profissional where uuid=$1', [req.params.id], (error, response) => {
        if (error) { return res.status(500).json({ message: error }) };
        return res.status(200).json( response.rows );
    });
}

const all = async (req,res) => {
    await pgSQL.query('select * from profissional', (error, response) => {
        if (error) { return res.status(500).json({ message: error }) };
        let dataJSON = {
            "rowcCunt": response.rowCount,
            "data": response.rows
        }        
        return res.status(200).json( dataJSON );
    })
}

const deleteProfissional = async (req, res) => {
    await pgSQL.query('delete from profissional where uuid=$1', 
    [req.params.id], 
    (error) => {
        if (error) { return res.status(500).json({ message: error }) };
        return res.status(200).json({ message: "Registro Apagado com Sucesso!" });
    })
}

module.exports = {
    create,
    update,
    show,
    all,
    deleteProfissional
};