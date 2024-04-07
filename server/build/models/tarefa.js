"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = exports.tarefaSchemaValidate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
exports.tarefaSchemaValidate = joi_1.default.object({
    usuarioEmail: joi_1.default.string().required(),
    titulo: joi_1.default.string().required(),
    descricao: joi_1.default.string().required(),
    dataAdicionada: joi_1.default.date().required(),
    dataLimite: joi_1.default.date().required(),
    dataConclusao: joi_1.default.date()
});
const tarefaSchema = new mongoose_1.Schema({
    usuarioEmail: { type: String, required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataAdicionada: { type: Date, required: true },
    dataLimite: { type: Date, required: true },
    dataConclusao: { type: Date }
});
exports.Tarefa = (0, mongoose_1.model)('Tarefa', tarefaSchema);
