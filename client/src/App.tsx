import { useEffect, useState } from 'react'
import "./App.css"
import Tarefa from "./components/Tarefa"
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

import { doGETALLtarefa } from "./api/getTarefas";
import { doPOSTtarefa } from "./api/postTarefas";
import { TTarefa, TarefaNoAutentication } from './api/types';

function App() {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const addTarefa = async (newTarefa : TarefaNoAutentication) => {
    const dadosComSenha = {...newTarefa, usuarioEmail: "testeemail@email.com", usuarioSenha : "senhateste"};
    const nTarefa = await doPOSTtarefa(dadosComSenha)
    setTarefas([...tarefas, nTarefa]);
  };

  useEffect(() => {
    async function fetchTarefas() {
      const newTarefas = await doGETALLtarefa();
      setTarefas(newTarefas);
    }
    fetchTarefas();
  },[]);

  return (
   <div className="app">
    <h1>Lista de tarefas</h1>
    <div className="flex-container">
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter}/>
    </div>
    <div className="todo-list">
      {tarefas.map((tarefa) => (
          <Tarefa 
            key={tarefa.titulo} 
            tarefa={tarefa} 
          />
      ))}
    </div>
    <TodoForm addTarefa = {addTarefa}/>
   </div>
   );
}

export default App
