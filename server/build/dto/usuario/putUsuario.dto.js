"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PutUsuarioDTO = exports.putUsuarioSchemaValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.putUsuarioSchemaValidate = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    primeiroNome: joi_1.default.string().required(),
    restoNome: joi_1.default.string().required(),
    dataNascimento: joi_1.default.date().required(),
    genero: joi_1.default.string().valid().required(),
    senhaAntiga: joi_1.default.string().valid().required(),
    senhaNova: joi_1.default.string().valid().required()
});
class PutUsuarioDTO {
    constructor(usuarioData) {
        this._data = usuarioData;
    }
    get data() {
        return this._data;
    }
}
exports.PutUsuarioDTO = PutUsuarioDTO;
