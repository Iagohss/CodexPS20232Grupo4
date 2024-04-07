"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsuarioDTO = exports.deleteUsuarioSchemaValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.deleteUsuarioSchemaValidate = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    senha: joi_1.default.string().valid().required()
});
class DeleteUsuarioDTO {
    constructor(usuarioData) {
        this._data = usuarioData;
    }
    validar() {
        return exports.deleteUsuarioSchemaValidate.validate(this.data);
    }
    get data() {
        return this._data;
    }
}
exports.DeleteUsuarioDTO = DeleteUsuarioDTO;
