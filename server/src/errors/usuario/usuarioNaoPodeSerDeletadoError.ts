import { NaoPodeSerDeletadoError } from "../naoPodeSerDeletadoError";

export class UsuarioNaoPodeSerDeletadoError extends NaoPodeSerDeletadoError{
    constructor(message: string = "O usuário não pôde ser deletado."){
        super(message)
        this.name = 'UsuarioNaoPodeSerDeletadoError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoPodeSerDeletadoError);
        }
    }
}