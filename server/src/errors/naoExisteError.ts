import { ResponseError } from "./ResponseError"

export class NaoExisteError extends ResponseError {
    constructor(message: string){
        super(message, 404)
        this.name = 'NaoExisteError'
    }
}