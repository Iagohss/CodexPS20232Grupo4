import { NaoPodeSerCriadoError } from "../naoPodeSerCriadoError"

export class TarefaNaoPodeSerCriadaError extends NaoPodeSerCriadoError{
    constructor(message: string = "A tarefa não pôde ser criada."){
        super(message)
        this.name = 'TarefaNaoPodeSerCriadaError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerCriadaError);
        }
    }
}