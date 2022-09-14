const mySQL = require('../config/dbConnection').poolConnection;

class ConvenioController {
    async create(req, res) {
        const {descricao} = req.body;
        if (!descricao) { return res.status(400).json({ message: "Necessário informar uma descrição"}) };
        await mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error })}
            conn.query('insert into convenio (descricao, created, altered) values (?,now(),now())',
                [descricao], 
                (error) => {
                    conn.release();                    
                    if (error) { return res.status(500).json({ error: error })};
                    return res.status(201).json({ message: "Convênio Criado com Sucesso!" });
                })
            })
    };

    async update(req, res) {
        const {descricao} = req.body;
        if (!descricao) { return res.status(400).json({ message: "Descrição precisa ser informado!"}) };
        await mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error })};
            conn.query('update convenio set descricao=?, altered=now() where id=?',
                [descricao, req.params.id],
                (error) => {
                    conn.release();
                    if (error) { return res.status(500).json({ error: error}) };
                    return res.status(200).json({ message: 'Registro Atualizado com Sucesso!'});
            })
        })
    }

    async all(req, res) {
        mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error}) };
            conn.query('select id, descricao from convenio order by descricao',
                (error, response) => {
                    conn.release();                    
                    if (error) { return res.status(500).json({ error: error }) };
                    return res.status(200).json({ data: response })
                })
        })
    }

    async show(req, res) {
        mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error }) };
            conn.query('select id, descricao from convenio where id=?',
                [req.params.id], 
                (error, response) => {
                    conn.release();                    
                    if (error) { return res.status(500).json({ error: error }) }
                    return res.status(200).json({ data: response });
            })
        })
    }

    async delete(req, res) {
        mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error }) };
            conn.query('delete from convenio where id=?',
                [req.params.id], 
                (error) => {
                    conn.release();                    
                    if (error) { return res.status(500).json({ error: error }) }
                    return res.status(200).json({ message: "Registro Apagado com Sucesso!" })
                })
        })
    } 
};

module.exports = new ConvenioController();