"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioNaoPodeSerModificadoError = void 0;
const naoPodeSerModificadoError_1 = require("../naoPodeSerModificadoError");
class UsuarioNaoPodeSerModificadoError extends naoPodeSerModificadoError_1.NaoPodeSerModificadoError {
    constructor(message = "O usuário não pôde ser modificado.") {
        super(message);
        this.name = 'UsuarioNaoPodeSerModificadoError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerModificadoError);
        }
    }
}
exports.UsuarioNaoPodeSerModificadoError = UsuarioNaoPodeSerModificadoError;
