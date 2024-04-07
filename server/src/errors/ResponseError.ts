/**
 * Classe que representa um erro de resposta em uma requisição ao servidor,
 * incluindo um código de status HTTP para ser utilizado ao enviar respostas.
 */
export class ResponseError extends Error {
    codigoResposta: number;

    constructor(message: string, codigo: number) {
        super(message);
        this.codigoResposta = codigo;
        this.name = 'ResponseError';
    }
}