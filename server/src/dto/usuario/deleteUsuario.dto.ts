import Joi from 'joi';

export const deleteUsuarioSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().valid().required()
});

interface IDeleteUsuarioDTO {
    email: string;
    senha: string;
}

export class DeleteUsuarioDTO {
    private _data: IDeleteUsuarioDTO;

    constructor(usuarioData: IDeleteUsuarioDTO) {
        this._data = usuarioData;
    }

    validar(): Joi.ValidationResult {
        return deleteUsuarioSchemaValidate.validate(this.data);
    }

    get data(): IDeleteUsuarioDTO {
        return this._data;
    }
}
