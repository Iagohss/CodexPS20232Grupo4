"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaNaoExisteError = void 0;
const naoExisteError_1 = require("../naoExisteError");
class TarefaNaoExisteError extends naoExisteError_1.NaoExisteError {
    constructor(message = "A tarefa não existe.") {
        super(message);
        this.name = 'TarefaNaoExisteError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoExisteError);
        }
    }
}
exports.TarefaNaoExisteError = TarefaNaoExisteError;
