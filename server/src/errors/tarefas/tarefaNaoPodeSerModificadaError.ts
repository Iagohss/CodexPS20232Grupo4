import { NaoPodeSerModificadoError } from "../naoPodeSerModificadoError"

export class TarefaNaoPodeSerModificadaError extends NaoPodeSerModificadoError{
    constructor(message: string = "A tarefa não pôde ser modificada."){
        super(message)
        this.name = 'TarefaNaoPodeSerModificadoError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerModificadaError);
        }
    }
}