"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaController = void 0;
const tarefa_service_1 = require("../services/tarefa.service");
const createTarefa_dto_1 = require("../dto/tarefa/createTarefa.dto");
const ResponseError_1 = require("../errors/ResponseError");
const postTarefa_dto_1 = require("../dto/tarefa/postTarefa.dto");
class tarefaController {
    constructor() {
        // GET ALL
        this.getTarefas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tarefas = yield tarefa_service_1.tarefaServices.getTarefas();
                res.send(tarefas);
            }
            catch (error) {
                if (error instanceof ResponseError_1.ResponseError) {
                    res.status(error.codigoResposta).json(error.message);
                }
            }
        });
        // POST
        this.postTarefa = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dadosSemSenha = {
                usuarioEmail: req.body.usuarioEmail,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                dataAdicionada: req.body.dataAdicionada,
                dataLimite: req.body.dataLimite,
                dataConclusao: req.body.dataConclusao
            };
            const dadosComSenha = Object.assign(Object.assign({}, dadosSemSenha), { usuarioSenha: req.body.usuarioSenha });
            const { error: error1, value: valueComSenha } = postTarefa_dto_1.postTarefaSchema.validate(dadosComSenha);
            const { error: error2, value: valueSemSenha } = createTarefa_dto_1.createTarefaSchema.validate(dadosSemSenha);
            if (error1 || error2) { // se a validação na aplicação falhar:
                const error = (error1 ? error1 : error2);
                const message = error.details.map(detail => detail.message);
                res.status(400).send(message); // TODO traduzir essas mensagens
            }
            else { // a validação na aplicação deu certo, falta a do MongoDB:
                try {
                    const tarefa = yield tarefa_service_1.tarefaServices.postTarefa(valueComSenha);
                    res.status(201).send(tarefa);
                }
                catch (error) {
                    if (error instanceof ResponseError_1.ResponseError) {
                        res.status(error.codigoResposta).json(error.message);
                    }
                    else {
                        res.status(500).json("Erro no servidor");
                    }
                }
            }
        });
    }
}
exports.TarefaController = new tarefaController();
