import Joi from 'joi';

export const returnUsuarioSchema = Joi.object({
    email: Joi.string().email().required(),
    primeiroNome: Joi.string().required(),
    restoNome: Joi.string().required(),
    dataNascimento: Joi.date().required(),
    genero: Joi.string().valid().required()
});

interface IReturnUsuarioDTO {
    email: string;
    primeiroNome: string;
    restoNome: string;
    dataNascimento: Date;
    genero: string;
}

export class ReturnUsuarioDTO {
    private _data: IReturnUsuarioDTO;

    constructor(usuarioData: IReturnUsuarioDTO) {
        this._data = usuarioData;
    }

    get data(): IReturnUsuarioDTO {
        return this._data;
    }

    static criarComUsuario(novoUsuario: any): ReturnUsuarioDTO {
        const usuarioData: IReturnUsuarioDTO = {
            email: novoUsuario.email,
            primeiroNome: novoUsuario.primeiroNome,
            restoNome: novoUsuario.restoNome,
            dataNascimento: novoUsuario.dataNascimento,
            genero: novoUsuario.genero,
        };
        return new ReturnUsuarioDTO(usuarioData);
    }
}
