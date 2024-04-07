import Joi from 'joi';

/*
Diferente de postTarefaDTO pois esse se trata do DTO usado para se comunicar com o MongoDB, não incluindo a senha do usuário.
*/

export const createTarefaSchema = Joi.object({
    usuarioEmail: Joi.string().email().required(),
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataAdicionada: Joi.date().required(),
    dataLimite: Joi.date().required(),
    dataConclusao: Joi.date()
});

interface ICreateTarefaDTO {
    usuarioEmail: string;
    titulo: string;
    descricao: string;
    dataAdicionada: Date;
    dataLimite: Date;
    dataConclusao: Date;
}

export class CreateTarefaDTO {
    private _data: ICreateTarefaDTO;

    constructor(tarefaData: ICreateTarefaDTO) {
        this._data = tarefaData;
    }


    static criarComPostTarefaDTO(postTarefaDTO : any) : CreateTarefaDTO{
        const postTarefaData = postTarefaDTO.data
        const createTarefaData = {
            usuarioEmail : postTarefaData.usuarioEmail,
            titulo: postTarefaData.titulo,
            descricao: postTarefaData.descricao,
            dataAdicionada: postTarefaData.dataAdicionada,
            dataLimite: postTarefaData.dataLimite,
            dataConclusao: postTarefaData.dataConclusao
        }   
        const DTO = new CreateTarefaDTO(createTarefaData)
        console.log(DTO)
        return DTO
    }

    get data(): ICreateTarefaDTO {
        return this._data;
    }

}