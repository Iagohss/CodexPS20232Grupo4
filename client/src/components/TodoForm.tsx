import {useState} from 'react'

type AddTarefaProps = {addTarefa : () => void}
const TodoForm = (props : AddTarefaProps) => {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        props.addTarefa();
        setValue("");
        setCategory("");
    };

  return (
    <div className="todo-form">
        <h2>Criar Tarefa:</h2>
        <form onSubmit={handleSubmit}>
            <input  
                type="Text" 
                placeholder='Digite o título da tarefa' 
                value={value}
                onChange={(e)=> setValue(e.target.value)}
            />
            <select 
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                >
                <option value="">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            <button type='submit'>Criar Tarefa</button>
        </form>
    </div>
  )
}

export default TodoForm