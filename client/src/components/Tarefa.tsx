import { TTarefa } from '../api/types'

type TarefaProps = {
  tarefa : TTarefa,
  completeTarefa : (newTarefa: TTarefa) => Promise<void>,
  removeTarefa : (id : string) => Promise<void>
}

const Tarefa = (props : TarefaProps) => {
  const { tarefa, completeTarefa, removeTarefa } = props;

  const handleComplete = () => {
    if (!tarefa.dataConclusao) {
      let newTarefa = tarefa;
      newTarefa.dataConclusao = new Date();
      completeTarefa(newTarefa);
    }
    };

  const handleRemove = () => {
    removeTarefa(tarefa.id);
    };

  return (
    <div className="todo">
        <div className="content">
          <div 
            className="details" style={{ 
              textDecoration: tarefa.dataConclusao
                ? "line-through" 
                : "" 
            }}
          >
            <h4 className="titulo">{tarefa.titulo}</h4>
            <p className="descricao">{tarefa.descricao}</p>
          </div>
          <p className="data"> {
            tarefa.dataConclusao
              ? "Data de conclusão: " + tarefa.dataConclusao!.toString().substring(0,10)
              : "Data Limite: " + tarefa.dataLimite.toString().substring(0,10) 
          }</p>
        </div>
        <div>
        <button className="complete" onClick={handleComplete}>
            {tarefa.dataConclusao ? "Tarefa concluída!" : "Completar"}
        </button>
        <button className="remove" onClick={handleRemove} >
            x
        </button>
        </div>
    </div>
  )
}

export default Tarefa