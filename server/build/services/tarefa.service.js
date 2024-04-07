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
exports.tarefaServices = exports.tarefaService = void 0;
const tarefa_1 = require("../models/tarefa");
const usuario_1 = require("../models/usuario");
const getTarefa_dto_1 = require("../dto/tarefa/getTarefa.dto");
const postTarefa_dto_1 = require("../dto/tarefa/postTarefa.dto");
const createTarefa_dto_1 = require("../dto/tarefa/createTarefa.dto");
const returnTarefa_dto_1 = require("../dto/tarefa/returnTarefa.dto");
const mongodb_1 = require("mongodb");
const databaseError_1 = require("../errors/databaseError");
const tarefaNaoPodeSerCriadaError_1 = require("../errors/tarefas/tarefaNaoPodeSerCriadaError");
const usuarioNaoExisteError_1 = require("../errors/usuario/usuarioNaoExisteError");
class tarefaService {
    // GET ALL
    getTarefas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tarefas = yield tarefa_1.Tarefa.find({});
                const tarefasDTO = tarefas.map(tarefa => {
                    return returnTarefa_dto_1.ReturnTarefaDTO.criarComTarefa(tarefa);
                });
                return tarefasDTO;
            }
            catch (error) {
                throw new databaseError_1.DatabaseError(error.message);
            }
        });
    }
    // GET ID
    getTarefa(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTarefaDTO = new getTarefa_dto_1.GetTarefaDTO(data);
            }
            catch (error) {
            }
        });
    }
    // POST
    postTarefa(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postTarefaDTO = new postTarefa_dto_1.PostTarefaDTO(data);
                const usuario = yield usuario_1.Usuario.findOne({ email: postTarefaDTO.data.usuarioEmail });
                if (!usuario) {
                    throw new usuarioNaoExisteError_1.UsuarioNaoExisteError();
                }
                if (usuario.senha !== postTarefaDTO.data.usuarioSenha) {
                    throw new tarefaNaoPodeSerCriadaError_1.TarefaNaoPodeSerCriadaError("Senha do usuário inválida.");
                }
                const createTarefaDTO = createTarefa_dto_1.CreateTarefaDTO.criarComPostTarefaDTO(postTarefaDTO);
                const novaTarefa = yield tarefa_1.Tarefa.create(createTarefaDTO.data);
                return returnTarefa_dto_1.ReturnTarefaDTO.criarComTarefa(novaTarefa);
            }
            catch (error) {
                if (error instanceof mongodb_1.MongoServerError) { // Bloco referente aos erros que podem ser jogados pelo MongoDB
                    if (error.code == 11000) {
                        const message = { message: `Usuário não pôde ser criado.`, valores: error.keyValue };
                        throw new tarefaNaoPodeSerCriadaError_1.TarefaNaoPodeSerCriadaError(JSON.stringify(message));
                    }
                    else { //TODO: os outros códigos do MongoServerError para não lançar apenas um DatabaseError
                        throw new databaseError_1.DatabaseError(error.message);
                    }
                }
                else { // 
                    throw error;
                }
            }
        });
    }
}
exports.tarefaService = tarefaService;
exports.tarefaServices = new tarefaService();
