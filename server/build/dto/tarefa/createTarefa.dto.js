"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTarefaDTO = exports.createTarefaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
/*
Diferente de postTarefaDTO pois esse se trata do DTO usado para se comunicar com o MongoDB, não incluindo a senha do usuário.
*/
exports.createTarefaSchema = joi_1.default.object({
    usuarioEmail: joi_1.default.string().email().required(),
    titulo: joi_1.default.string().required(),
    descricao: joi_1.default.string().required(),
    dataAdicionada: joi_1.default.date().required(),
    dataLimite: joi_1.default.date().required(),
    dataConclusao: joi_1.default.date()
});
class CreateTarefaDTO {
    constructor(tarefaData) {
        this._data = tarefaData;
    }
    static criarComPostTarefaDTO(postTarefaDTO) {
        const postTarefaData = postTarefaDTO.data;
        const createTarefaData = {
            usuarioEmail: postTarefaData.usuarioEmail,
            titulo: postTarefaData.titulo,
            descricao: postTarefaData.descricao,
            dataAdicionada: postTarefaData.dataAdicionada,
            dataLimite: postTarefaData.dataLimite,
            dataConclusao: postTarefaData.dataConclusao
        };
        const DTO = new CreateTarefaDTO(createTarefaData);
        console.log(DTO);
        return DTO;
    }
    get data() {
        return this._data;
    }
}
exports.CreateTarefaDTO = CreateTarefaDTO;
