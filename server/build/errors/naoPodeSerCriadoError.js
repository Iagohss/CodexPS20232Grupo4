"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoPodeSerCriadoError = void 0;
const ResponseError_1 = require("./ResponseError");
class NaoPodeSerCriadoError extends ResponseError_1.ResponseError {
    constructor(message) {
        super(message, 400);
        this.name = 'NaoPodeSerCriado';
    }
}
exports.NaoPodeSerCriadoError = NaoPodeSerCriadoError;
