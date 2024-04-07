"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnTarefaDTO = void 0;
const joi_1 = __importDefault(require("joi"));
const returnTarefaSchema = joi_1.default.object({
    usuarioEmail: joi_1.default.string().email().required(),
    titulo: joi_1.default.string().required(),
    descricao: joi_1.default.string().required(),
    dataAdicionada: joi_1.default.date().required(),
    dataLimite: joi_1.default.date().required(),
    dataConclusao: joi_1.default.date()
});
class ReturnTarefaDTO {
    constructor(tarefaData) {
        this._data = tarefaData;
    }
    get data() {
        return this._data;
    }
    static criarComTarefa(novaTarefa) {
        const tarefaData = {
            usuarioEmail: novaTarefa.usuarioEmail,
            titulo: novaTarefa.titulo,
            descricao: novaTarefa.descricao,
            dataAdicionada: novaTarefa.dataAdicionada,
            dataLimite: novaTarefa.dataLimite,
            dataConclusao: novaTarefa.dataConclusao,
        };
        return new ReturnTarefaDTO(tarefaData);
    }
}
exports.ReturnTarefaDTO = ReturnTarefaDTO;
