import { TTarefa } from '../api/getTarefas'

type TarefaProps = {
  tarefa : TTarefa
}

const Tarefa = (props : TarefaProps) => {
  const tarefa = props.tarefa;
  return (
    <div 
        className="todo" 
        style={{ textDecoration: tarefa.dataConclusao && 
                                  tarefa.dataConclusao <= tarefa.dataLimite ? "line-through" : "" 
        }}
    >
        <div className="content">
        <p>{tarefa.titulo}</p>
        <p>{tarefa.descricao}</p>
        {/*<p className="data">Data Limite: {tarefa.dataLimite.getDate()}/{tarefa.dataLimite.getMonth()}</p>
        </div>
        <div>
        {/* <button className="complete" onClick={() => completeTodo(todo.id)}>
            Completar
        </button>
        <button className="remove" onClick={() => rmvTodo(todo.id)}>
            x
        </button> */}
        </div>
    </div>
  )
}

export default Tarefa