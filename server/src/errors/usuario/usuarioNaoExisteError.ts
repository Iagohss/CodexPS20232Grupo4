import {NaoExisteError} from '../naoExisteError'

export class UsuarioNaoExisteError extends NaoExisteError{
    constructor(message: string = "O usuário não existe."){
        super(message)
        this.name = 'UsuarioNaoExisteError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UsuarioNaoExisteError);
        }
    }
}