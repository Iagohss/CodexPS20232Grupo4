"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaoExisteError = void 0;
const ResponseError_1 = require("./ResponseError");
class NaoExisteError extends ResponseError_1.ResponseError {
    constructor(message) {
        super(message, 404);
        this.name = 'NaoExisteError';
    }
}
exports.NaoExisteError = NaoExisteError;
