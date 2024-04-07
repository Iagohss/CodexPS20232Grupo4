import { ResponseError } from "./ResponseError"

export class NaoPodeSerCriadoError extends ResponseError {
    constructor(message: string){
        super(message, 400)
        this.name = 'NaoPodeSerCriado'
    }
}