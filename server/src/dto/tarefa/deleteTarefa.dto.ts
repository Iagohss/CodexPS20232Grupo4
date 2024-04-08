import Joi from 'joi';

export const deleteTarefaSchemaValidate = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    usuarioSenha: Joi.string().required(),
    tarefaID: Joi.string().required()
});

interface IDeleteTarefaDTO {
    usuarioEmail: string;
    usuarioSenha: string;
    tarefaID: string;
}

export class DeleteTarefaDTO {
    private _data: IDeleteTarefaDTO;

    constructor(tarefaData: IDeleteTarefaDTO) {
        this._data = tarefaData;
    }

    get data(): IDeleteTarefaDTO {
        return this._data;
    }
}
