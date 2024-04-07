"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTarefaDTO = exports.postTarefaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
/*
Diferente de createTarefaDTO pois esse se trata do DTO da requisição POST, incluindo a senha do usuário.
*/
exports.postTarefaSchema = joi_1.default.object({
    usuarioEmail: joi_1.default.string().email().required(),
    usuarioSenha: joi_1.default.string().required(),
    titulo: joi_1.default.string().required(),
    descricao: joi_1.default.string().required(),
    dataAdicionada: joi_1.default.date().required(),
    dataLimite: joi_1.default.date().required(),
    dataConclusao: joi_1.default.date()
});
class PostTarefaDTO {
    constructor(tarefaData) {
        this._data = tarefaData;
    }
    get data() {
        return this._data;
    }
}
exports.PostTarefaDTO = PostTarefaDTO;
