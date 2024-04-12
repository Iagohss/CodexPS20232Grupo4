import Joi from 'joi';

export const getTarefaSchema = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    usuarioSenha: Joi.string().required(),
    tarefaID: Joi.string().required()
});

interface IGetTarefaDTO {
    usuarioEmail: string;
    usuarioSenha: string;
    tarefaID: string;
}

export class GetTarefaDTO {
    private _data: IGetTarefaDTO;

    constructor(tarefaData: IGetTarefaDTO) {
        this._data = tarefaData;
    }

    get data(): IGetTarefaDTO {
        return this._data;
    }
}
