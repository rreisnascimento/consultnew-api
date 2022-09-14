const Sequelize = require('sequelize');

const conexaoPG = new Sequelize(
        process.env.APP_BD_NAME, 
        process.env.APP_BD_USERNAME, 
        process.env.APP_BD_PASSWORD, {
        host: process.env.APP_BD_HOSTNAME,
        port: process.env.APP_BD_PORTA,
        dialect: 'postgres',
        define: {
            freezeTableName: true,
            timestamps: false
    }
});

try {
    sequelize.authenticate();
    console.log("Conexão com o Banco de Dados realizada com Sucesso!");
} catch (error) {
    console.log("Problemas ao conectar! Por Favor entre em contato com o Administrador!");
};

module.exports = conexaoPG;