"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTarefaDTO = void 0;
const joi_1 = __importDefault(require("joi"));
const getTarefaSchema = joi_1.default.object({
    usuarioEmail: joi_1.default.string().email().required(),
    usuarioSenha: joi_1.default.string().required(),
    tarefaID: joi_1.default.string().required()
});
class GetTarefaDTO {
    constructor(tarefaData) {
        this._data = tarefaData;
    }
    get data() {
        return this._data;
    }
}
exports.GetTarefaDTO = GetTarefaDTO;
