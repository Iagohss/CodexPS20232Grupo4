import { ResponseError } from "./ResponseError"

export class NaoPodeSerModificadoError extends ResponseError {
    constructor(message: string){
        super(message, 401)
        this.name = 'NaoPodeSerModificado'
    }
}