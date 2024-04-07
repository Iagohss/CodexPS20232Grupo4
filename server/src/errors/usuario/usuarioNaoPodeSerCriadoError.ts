import { NaoPodeSerCriadoError } from "../naoPodeSerCriadoError"

export class UsuarioNaoPodeSerCriadoError extends NaoPodeSerCriadoError{
    constructor(message: string = "O usuário não pôde ser criado."){
        super(message)
        this.name = 'UsuarioNaoPodeSerCriadoError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerCriadoError);
        }
    }
}