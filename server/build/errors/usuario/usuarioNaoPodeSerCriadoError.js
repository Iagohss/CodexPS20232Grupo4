"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioNaoPodeSerCriadoError = void 0;
const naoPodeSerCriadoError_1 = require("../naoPodeSerCriadoError");
class UsuarioNaoPodeSerCriadoError extends naoPodeSerCriadoError_1.NaoPodeSerCriadoError {
    constructor(message = "O usuário não pôde ser criado.") {
        super(message);
        this.name = 'UsuarioNaoPodeSerCriadoError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerCriadoError);
        }
    }
}
exports.UsuarioNaoPodeSerCriadoError = UsuarioNaoPodeSerCriadoError;
