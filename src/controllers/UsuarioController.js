const mySQL = require('./../config/dbConnection').poolConnection;
const SendEmail = require("nodemailer");
const bcrypt = require('bcryptjs');

class UsuarioController {
    async create(req, res) {
        const {name, email, password} = req.body;
        const hashUser = email+'consult.'+password+'.new';
        const cmdSQL = "insert into usuario (name, email, password, created, altered, idtipousuario) value (?,?,?,now(),now(),3)";
        await bcrypt.hash(hashUser, 10, function(error, hashGenerate) {
            if (error) 
                return res.status(500).send({ message: error })
            mySQL.getConnection((error, conn) => {
                if (error) { return res.status(500).json({ error: error }) }
                conn.query(cmdSQL, [name, email, hashGenerate],
                    (error) => {
                        conn.release();
                        if (error) {
                            return res.status(500).json({
                                error: error,
                                response: null
                            })
                        }
                        res.status(201).json({
                            nome: name,
                            email: email,
                            token: hashGenerate,
                            tipo: "Usuario"
                        });


                        const nodemailer = require("nodemailer");

                        const SendEmail = nodemailer.createTransport({
                            host: "smtp.umbler.com",
                            port: 587,
                            auth: { 
                                user: "contato@consultnew.app.br",
                                pass: "Contato088*"
                            }
                        });
                        
                        SendEmail.sendMail({
                            from: "contato@consultnew.app.br",
                            to: "roger088reis@gmail.com",
                            replyTo: "contato@consultnew.app.br",
                            subject: "Assunto do Email",
                            text: "Ola seja Bem Vindo!"
                        }).then(info => {
                            console.log(info);
                        }).catch(error => {
                            console.log(error)
                        });


                })
            })
        });
    };

    async userAdmin(req, res) {
        const {name, email, password} = req.body;
        const hashUser = email+'consult.'+password+'.new';
        const cmdSQL = "insert into usuario (name, email, password, created, altered, idtipousuario) value (?,?,?,now(),now(),1)";
        await bcrypt.hash(hashUser, 10, function(error, hashGenerate) {
            if (error) 
                return res.status(500).send({ message: error })
            mySQL.getConnection((error, conn) => {
                if (error) { return res.status(500).json({ error: error }) }
                conn.query(cmdSQL, [name, email, hashGenerate],
                    (error) => {
                        conn.release();
                        if (error) {
                            return res.status(500).json({
                                error: error,
                                response: null
                            })
                        }
                        res.status(201).json({
                            nome: name,
                            email: email,
                            token: hashGenerate,
                            tipo: "Administrador"
                        })
                })
            })
        });
    };  
    
    async userProfissional(req, res) {
        const {name, email, password} = req.body;
        const hashUser = email+'consult.'+password+'.new';
        const cmdSQL = "insert into usuario (name, email, password, created, altered, idtipousuario) value (?,?,?,now(),now(),2)";
        await bcrypt.hash(hashUser, 10, function(error, hashGenerate) {
            if (error) 
                return res.status(500).send({ message: error })
            mySQL.getConnection((error, conn) => {
                if (error) { return res.status(500).json({ error: error }) }
                conn.query(cmdSQL, [name, email, hashGenerate],
                    (error) => {
                        conn.release();
                        if (error) {
                            return res.status(500).json({
                                error: error,
                                response: null
                            })
                        }
                        res.status(201).json({
                            nome: name,
                            email: email,
                            token: hashGenerate,
                            tipo: "Especialista"
                        })
                })
            })
        });
    };      

    async validation(req, res) {
        const {email, password} = req.body;
        const cmdSQL = "select * from usuario where email=?";
        await mySQL.getConnection((error, conn) => {
            if (error) { return res.status(500).json({ error: error }) }
                conn.query(cmdSQL, [ email ], 
                    (error, response, fields) => {
                    if (error) { return res.status(500).json({ error: error })}
                    if (response.length == 0) { return res.status(400).json({ authorized: false }) }
                    const hashUser = email+'consult.'+password+'.new';
                    bcrypt.compare(hashUser, response[0].password, function(error, result) {
                        if (error) { return res.status(500).json({ error: error }) }
                        if (result) {
                            return res.status(200).json({ 
                                name: response[0].name, 
                                email: response[0].email,
                                token: response[0].password, 
                                authorized: result })
                            } else return res.status(401).json({ authorized: result })
                    });
                })
            })
    };
};

module.exports = new UsuarioController();