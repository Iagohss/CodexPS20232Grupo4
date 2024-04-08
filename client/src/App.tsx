import { useEffect, useState } from 'react'
import "./App.css"
import Tarefa from "./components/Tarefa"
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

import { doGETALLtarefa } from "./api/getTarefas";
import { doPOSTtarefa } from "./api/postTarefas";
import { TTarefa } from './api/types';

function App() {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTarefa = async () => {
    const dataAdicionada: Date = new Date();
    let dataLimite: Date = new Date(dataAdicionada);
    let dataConclusao: Date = new Date(dataAdicionada);
    dataLimite.setDate(dataLimite.getDate() + 7)
    dataConclusao.setDate(dataConclusao.getDate() + Math.floor(Math.random() * 10) + 1);

    //Esse objeto deve ser criado por TodoForm e passado como parâmetro
    //App deve apenas adicionar informações de email e senha
    const newTarefa: TTarefa = {
      usuarioEmail: "testeemail@email.com",
      titulo: "Teste",
      descricao: "Testando",
      dataAdicionada: dataAdicionada,
      dataLimite: dataAdicionada,
      dataConclusao: dataAdicionada
    };
    const dadosComSenha = {...newTarefa, usuarioSenha : "senhateste"};
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
    <Search search={search} setSearch={setSearch}/>
    <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
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
