"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaNaoPodeSerDeletadaError = void 0;
const naoPodeSerDeletadoError_1 = require("../naoPodeSerDeletadoError");
class TarefaNaoPodeSerDeletadaError extends naoPodeSerDeletadoError_1.NaoPodeSerDeletadoError {
    constructor(message = "A tarefa não pôde ser deletado.") {
        super(message);
        this.name = 'TarefaNaoPodeSerDeletadaError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerDeletadaError);
        }
    }
}
exports.TarefaNaoPodeSerDeletadaError = TarefaNaoPodeSerDeletadaError;
