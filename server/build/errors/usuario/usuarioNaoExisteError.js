"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioNaoExisteError = void 0;
const naoExisteError_1 = require("../naoExisteError");
class UsuarioNaoExisteError extends naoExisteError_1.NaoExisteError {
    constructor(message = "O usuário não existe.") {
        super(message);
        this.name = 'UsuarioNaoExisteError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoExisteError);
        }
    }
}
exports.UsuarioNaoExisteError = UsuarioNaoExisteError;
