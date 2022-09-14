// const EspecialidadeModel = require("../models/EspecialidadeModel");
const pgSQL = require("../config/dbConnectionPG");
const adfunc = require("../utils/utilsfunc");

const create = async (req,res) => {
    /**
     * @swagger
     * /especialidade:
     *   get:
     *     tags:
     *       - Especialidade
     *     description: Get Especialidade
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Retorna todas as Especialidades
     *     schema: 
     *        $ref: '#/components/schemas/Especialidade'
     */
     try {
        // await EspecialidadeModel.create({
        //     uuid: adfunc.gerarIdUnico(),
        //     descricao: req.body.descricao
        // });
        return res.status(201).json({ message: "Cadastro gerado com Sucesso!"});
     } catch(error) {
        return res.status(500).json({ message: "Problema ao Gerar Cadastro" }) 
     }
};

const all = async (req,res) => {
    await pgSQL.query('select * from especialidade', (error, response) => {
        if (error) { 
            return res.status(500).json({ Erro: "Problema ao carregar informações" }) 
        };
        let dataJSON = {
            "rowcCunt": response.rowCount,
            "data": response.rows
        }
        return res.status(200).json( dataJSON );
    })        
}

module.exports = {
    create,
    all,
    async show(req, res) {
        const uuid = req.params.id;
        if (!uuid) {
            return res.status(400).json({ message: "Necessário informar um Parâmetro!"})
        }
        await pgSQL.query('select * from especialidade where uuid=$1',
            [uuid],
            (error, result) => {
                if (error) {
                    return res.status(500).json({ Erro: "Problema ao carregar informações" }) 
                }
                return res.status(200).json( result.rows )
            }
        );
    },
    async update(req, res) {
        const uuid = req.params.id;
        const { descricao } = req.body;
        if (!uuid) {
            return res.status(400).json({ message: "Necessário informar um Parâmetro!"})
        } else if (!descricao) {
            return res.status(400).json({ message: "Necessário informar uma Descrição!"})
        }
        await pgSQL.query('update especialidade set descricao=$1, altered=now() where uuid=$2',
            [descricao, uuid],
            (error) => {
                if (error) {
                    return res.status(500).json({ Erro: "Problema ao atualizar informações" }) 
                }
                return res.status(200).json({ message: "Registro atualizado com Sucesso!"})
            }
        )
    },
    async delete(req, res) {
        const uuid = req.params.id;
        if (!uuid) {
            return res.status(400).json({ message: "Necessário informar um Parâmetro!"})
        }
        await pgSQL.query('delete from especialidade where uuid=$1',
            [uuid], 
            (error) => {
                if (error) {
                    return res.status(500).json({ Erro: "Problema ao atualizar informações" })                     
                }
                return res.status(200).json({ message: "Registro Apagado com Sucesso!"})
            }
        );
    }
}