const UserValidationToken = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email)
        return res.status(400).json({ message: "Email Obrigatório!" })
    else if (!password)
        return res.status(400).json({ message: "Senha Obrigatório!" })
    else next();
}

module.exports = UserValidationToken;