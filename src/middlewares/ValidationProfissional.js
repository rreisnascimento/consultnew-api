const ValidationProfissional = (req, res, next) => {
    const { nome, especialidade, endereco, complemento, bairro, cidade, uf } = req.body;
    
    if (!nome)
        return res.status(400).json({ message: "Nome do Profissional Obrigatório!" })
    else if (!especialidade)
        return res.status(400).json({ message: "Especialidade do Profissional Obrigatório!" })
    else if (!endereco)
        return res.status(400).json({ message: "Endereço do Profissional Obrigatório!" })
    else if (!complemento)
        return res.status(400).json({ message: "Complemento do Profissional Obrigatório!" })
    else if (!bairro)
        return res.status(400).json({ message: "Bairro do Profissional Obrigatório!" })
    else if (!cidade)
        return res.status(400).json({ message: "Cidade do Profissional Obrigatório!" })
    else if (!uf)
        return res.status(400).json({ message: "UF do Profissional Obrigatório!" })
    else next();
}

module.exports = ValidationProfissional;