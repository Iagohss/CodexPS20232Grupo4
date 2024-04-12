import Joi from 'joi';

export const postUsuarioSchema = Joi.object({
    email: Joi.string().email().required(),
    primeiroNome: Joi.string().required(),
    restoNome: Joi.string().required(),
    dataNascimento: Joi.date().required(),
    genero: Joi.string().valid().required(),
    senha: Joi.string().required()
});

interface IPostUsuarioDTO {
    email: string;
    primeiroNome: string;
    restoNome: string;
    dataNascimento: Date;
    genero: string;
    senha: string;
}

export class PostUsuarioDTO {
    private _data: IPostUsuarioDTO;

    constructor(usuarioData: IPostUsuarioDTO) {
        this._data = usuarioData;
    }

    get data(): IPostUsuarioDTO {
        return this._data;
    }
}
