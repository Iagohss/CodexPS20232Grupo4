"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = exports.usuarioSchemaValidate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
exports.usuarioSchemaValidate = joi_1.default.object({
    email: joi_1.default.string().required(),
    primeiroNome: joi_1.default.string().required(),
    restoNome: joi_1.default.string().required(),
    dataNascimento: joi_1.default.date().required(),
    genero: joi_1.default.string().required(),
    senha: joi_1.default.string().required()
});
const usuarioSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    primeiroNome: { type: String, required: true },
    restoNome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    genero: { type: String, required: true },
    senha: { type: String, required: true }
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
