import Joi from 'joi';

export const putTarefaSchemaValidate = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    usuarioSenha: Joi.string().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date().required(),
    tarefaID: Joi.string().required()
});

interface IPutTarefaDTO {
    usuarioEmail: string;
    usuarioSenha: string;
    titulo: string;
    descricao: string;
    dataAdicionada: Date;
    dataLimite: Date;
    dataConclusao: Date;
    tarefaID: string;
}

export class PutTarefaDTO {
    private _data: IPutTarefaDTO;

    constructor(tarefaData: IPutTarefaDTO) {
        this._data = tarefaData;
    }

    validar(): Joi.ValidationResult {
        return putTarefaSchemaValidate.validate(this.data);
    }

    get data(): IPutTarefaDTO {
        return this._data;
    }
}
