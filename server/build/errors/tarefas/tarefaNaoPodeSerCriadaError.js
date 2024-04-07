"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaNaoPodeSerCriadaError = void 0;
const naoPodeSerCriadoError_1 = require("../naoPodeSerCriadoError");
class TarefaNaoPodeSerCriadaError extends naoPodeSerCriadoError_1.NaoPodeSerCriadoError {
    constructor(message = "A tarefa não pôde ser criada.") {
        super(message);
        this.name = 'TarefaNaoPodeSerCriadaError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerCriadaError);
        }
    }
}
exports.TarefaNaoPodeSerCriadaError = TarefaNaoPodeSerCriadaError;
