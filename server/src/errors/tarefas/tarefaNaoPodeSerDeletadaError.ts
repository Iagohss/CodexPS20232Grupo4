import { NaoPodeSerDeletadoError } from "../naoPodeSerDeletadoError";

export class TarefaNaoPodeSerDeletadaError extends NaoPodeSerDeletadoError{
    constructor(message: string = "A tarefa não pôde ser deletado."){
        super(message)
        this.name = 'TarefaNaoPodeSerDeletadaError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, TarefaNaoPodeSerDeletadaError);
        }
    }
}