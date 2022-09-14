require("dotenv").config({ path: "variables.env"});
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
//const dbPG = require("./config/dbconfig");

server.use(cors());
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

var swaggerDefinition = {
    info: {
        title: "API ConsultNew",
        version: "1.0.0",
        description: "Documentação de API"
    },
    components: {
        schemas: require("./schemas.json")
    }
}

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./routes/EspecialidadeRoute.js"]
}

var swaggerSpec = swaggerJSDoc(options);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const UsuarioRoutes = require("./routes/UsuarioRoute");
const PreCadastroProfissionalRoutes = require("./routes/PreCadastroProfissionalRoute")
const EspecialidadeRoutes = require("./routes/EspecialidadeRoute");
const EspecialistaRoutes = require("./routes/Especialistas");
const ProfissionalRoutes = require("./routes/ProfissionalRoute");
// const ConvenioRoutes = require("./routes/ConvenioRoute");

// server.use("/user", UsuarioRoutes);
server.use("/precadastro", PreCadastroProfissionalRoutes);
server.use("/especialidade", EspecialidadeRoutes);
server.use("/especialista", EspecialistaRoutes);
server.use("/profissional", ProfissionalRoutes);
// server.use("/convenio", ConvenioRoutes)

// dbPG.sync({force: true});

server.listen(process.env.PORT || 5000, (erro) => {
    if (erro) {
        console.log("Aconteceu algum problema ao Conectar com Servidor")
    } else {
        console.log("Servidor rodando: " + process.env.PORT)
    }
}); 