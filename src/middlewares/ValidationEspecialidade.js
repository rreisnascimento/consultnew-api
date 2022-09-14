const ValidationProfissional = (req, res, next) => {
    const { descricao } = req.body;
    if (!descricao) {
        return res.status(400).json({ message: "Descrição da Especialidade é obrigatória!"})
    } else next();
}

module.exports = ValidationProfissional;