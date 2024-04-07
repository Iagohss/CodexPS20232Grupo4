"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaNaoPodeSerModificadaError = void 0;
const naoPodeSerModificadoError_1 = require("../naoPodeSerModificadoError");
class TarefaNaoPodeSerModificadaError extends naoPodeSerModificadoError_1.NaoPodeSerModificadoError {
    constructor(message = "A tarefa não pôde ser modificada.") {
        super(message);
        this.name = 'TarefaNaoPodeSerModificadoError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerModificadaError);
        }
    }
}
exports.TarefaNaoPodeSerModificadaError = TarefaNaoPodeSerModificadaError;
