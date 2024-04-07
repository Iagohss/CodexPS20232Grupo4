"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const ResponseError_1 = require("./ResponseError");
class DatabaseError extends ResponseError_1.ResponseError {
    constructor(message = 'Erro com a conexão do Mongoose') {
        super(message, 500);
        this.name = 'DatabaseError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
    }
}
exports.DatabaseError = DatabaseError;
