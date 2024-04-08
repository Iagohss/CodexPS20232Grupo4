import { TTarefa } from '../api/types'

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
        <h4 className="titulo">{tarefa.titulo}</h4>
        <p className="descricao">{tarefa.descricao}</p>
        <p className="data">Data Limite: {tarefa.dataLimite.toString().substring(0,10)}</p>
        </div>
        <div>
        <button className="complete" /* onClick={() => completeTodo(todo.id)} */>
            Completar
        </button>
        {/* <button className="remove" onClick={() => rmvTodo(todo.id)}>
            x
        </button> */}
        </div>
    </div>
  )
}

export default Tarefa