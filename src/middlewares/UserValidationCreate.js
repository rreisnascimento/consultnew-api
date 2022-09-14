const mySQL = require('./../config/dbConnection').poolConnection;

const ValidationUserCreate = async (req, res, next) => {
    if (!req.body.name)
        return res.status(400).json({ message: "Name Obrigatório!" })
    else if (!req.body.email)
        return res.status(400).json({ message: "Email Obrigatório!" })
    else if (!req.body.password) 
        return res.status(400).json({ message: "Password Obrigatório!"})
    else {
        mySQL.getConnection((error, conn) => {
            if ( error ) { return res.status(500).json({ error: error }) }
            conn.query('select * from usuario where email=?', [ req.body.email ], (error, response, fields) => {
                if (error) { return res.status(500).json({ error: error }) }
                if(response.length == 1) {
                    return res.status(401).json({ message: "Usuário não permitido para Cadastro!" });
                } else next();
            })
        })
    }
};

module.exports = ValidationUserCreate;