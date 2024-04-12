import { ResponseError } from "./ResponseError"

export class NaoPodeSerDeletadoError extends ResponseError {
    constructor(message: string){
        super(message, 401)
        this.name = 'NaoPodeSerDeletado'
    }
}