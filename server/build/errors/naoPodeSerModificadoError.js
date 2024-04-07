"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoPodeSerModificadoError = void 0;
const ResponseError_1 = require("./ResponseError");
class NaoPodeSerModificadoError extends ResponseError_1.ResponseError {
    constructor(message) {
        super(message, 401);
        this.name = 'NaoPodeSerModificado';
    }
}
exports.NaoPodeSerModificadoError = NaoPodeSerModificadoError;
