const ValidationProfissional = (req, res, next) => {
    const { nome, endereco } = req.body;
    
    if (!nome)
        return res.status(400).json({ 
            status: 400,
            message: "Nome do Profissional Obrigatório!" 
        })
    else if (!especialidade)
        return res.status(400).json({ 
            status: 400,
            message: "Especialidade do Profissional Obrigatório!" 
        })
    else if (!endereco)
        return res.status(400).json({ 
            status: 400,
            message: "Endereço do Profissional Obrigatório!" 
        })
    else next();
}

module.exports = ValidationProfissional;