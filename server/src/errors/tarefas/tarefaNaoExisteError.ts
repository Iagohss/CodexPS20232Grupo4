import {NaoExisteError} from '../naoExisteError'

export class TarefaNaoExisteError extends NaoExisteError{
    constructor(message: string = "A tarefa não existe."){
        super(message)
        this.name = 'TarefaNaoExisteError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoExisteError);
        }
    }
}