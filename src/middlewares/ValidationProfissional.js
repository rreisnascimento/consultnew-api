const ValidationProfissional = (req, res, next) => {
    const { nome, clinica, especialidade, cep, endereco, complemento, bairro, cidade, uf, comercial, celular, email } = req.body;
    
    if (!nome)
        return res.status(400).json({ message: "Nome do Profissional Obrigatório!" })
    else if (!clinica)
        return res.status(400).json({ message: "Nome da Clinica Obrigatório!" })
    else if (!especialidade)
        return res.status(400).json({ message: "Especialidade do Profissional Obrigatório!" })
    else if (!cep)
        return res.status(400).json({ message: "CEP é Obrigatório!" })        
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
    else if (!comercial)
        return res.status(400).json({ message: "Telefone Comercial é Obrigatório!" })
    else if (!celular)
        return res.status(400).json({ message: "Telefone Celular é Obrigatório!" })
    else if (!email)
        return res.status(400).json({ message: "Necessário informar um Email válido!" })
    else next();
}

module.exports = ValidationProfissional;