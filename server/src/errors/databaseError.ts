import { ResponseError } from "./ResponseError";

export class DatabaseError extends ResponseError {
    constructor(message: string = 'Erro com a conexão do Mongoose'){
        super(message, 500)
        this.name = 'DatabaseError'
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
    }
}