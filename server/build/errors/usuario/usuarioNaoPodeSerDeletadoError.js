"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioNaoPodeSerDeletadoError = void 0;
const naoPodeSerDeletadoError_1 = require("../naoPodeSerDeletadoError");
class UsuarioNaoPodeSerDeletadoError extends naoPodeSerDeletadoError_1.NaoPodeSerDeletadoError {
    constructor(message = "O usuário não pôde ser deletado.") {
        super(message);
        this.name = 'UsuarioNaoPodeSerDeletadoError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerDeletadoError);
        }
    }
}
exports.UsuarioNaoPodeSerDeletadoError = UsuarioNaoPodeSerDeletadoError;
