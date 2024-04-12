import { NaoPodeSerModificadoError } from "../naoPodeSerModificadoError"

export class UsuarioNaoPodeSerModificadoError extends NaoPodeSerModificadoError{
    constructor(message: string = "O usuário não pôde ser modificado."){
        super(message)
        this.name = 'UsuarioNaoPodeSerModificadoError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerModificadoError);
        }
    }
}