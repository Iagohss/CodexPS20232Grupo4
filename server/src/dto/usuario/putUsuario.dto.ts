import Joi from 'joi';

export const putUsuarioSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    primeiroNome: Joi.string().required(),
    restoNome: Joi.string().required(),
    dataNascimento: Joi.date().required(),
    genero: Joi.string().valid().required(),
    senhaAntiga: Joi.string().valid().required(),
    senhaNova: Joi.string().valid().required()
});

interface IPutUsuarioDTO {
    email: string;
    primeiroNome: string;
    restoNome: string;
    dataNascimento: Date;
    genero: string;
    senhaAntiga: string;
    senhaNova: string;
}

export class PutUsuarioDTO {
    private _data: IPutUsuarioDTO;

    constructor(usuarioData: IPutUsuarioDTO) {
        this._data = usuarioData;
    }

    get data(): IPutUsuarioDTO {
        return this._data;
    }
}
