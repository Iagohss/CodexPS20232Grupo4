"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
/**
 * Classe que representa um erro de resposta em uma requisição ao servidor,
 * incluindo um código de status HTTP para ser utilizado ao enviar respostas.
 */
class ResponseError extends Error {
    constructor(message, codigo) {
        super(message);
        this.codigoResposta = codigo;
        this.name = 'ResponseError';
    }
}
exports.ResponseError = ResponseError;
