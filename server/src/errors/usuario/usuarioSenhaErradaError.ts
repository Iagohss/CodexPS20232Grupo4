import { ResponseError } from "../ResponseError";

export class UsuarioSenhaErradaError extends ResponseError{
    constructor(message: string = "Senha do usuário incorreta."){
        super(message, 401)
        this.name = 'UsuarioSenhaErradaError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioSenhaErradaError);
        }
    }
}