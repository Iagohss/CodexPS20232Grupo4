"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoPodeSerDeletadoError = void 0;
const ResponseError_1 = require("./ResponseError");
class NaoPodeSerDeletadoError extends ResponseError_1.ResponseError {
    constructor(message) {
        super(message, 401);
        this.name = 'NaoPodeSerDeletado';
    }
}
exports.NaoPodeSerDeletadoError = NaoPodeSerDeletadoError;
