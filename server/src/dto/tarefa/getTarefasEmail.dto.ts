import Joi from 'joi';

export const getTarefasEmailSchema = Joi.object({
    usuarioSenha: Joi.string().required()
});

interface IGetTarefasEmailDTO {
    usuarioSenha: string;
}

export class GetTarefasEmailDTO {
    private _data: IGetTarefasEmailDTO;

    constructor(tarefaData: IGetTarefasEmailDTO) {
        this._data = tarefaData;
    }

    get data(): IGetTarefasEmailDTO {
        return this._data;
    }
}
