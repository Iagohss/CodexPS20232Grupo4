import { useEffect, useState } from 'react'
import "./App.css"
import Tarefa from "./components/Tarefa"
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

import { TTarefa, getTarefas } from "./api/getTarefas";
import { postTarefa } from "./api/postTarefas";

function App() {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTarefa = () => {
    const dataAdicionada: Date = new Date();
    let dataLimite: Date = new Date(dataAdicionada);
    let dataConclusao: Date = new Date(dataAdicionada);
    dataLimite.setDate(dataLimite.getDate() + 7)
    dataConclusao.setDate(dataConclusao.getDate() + Math.floor(Math.random() * 10) + 1);

    const newTarefa: TTarefa = {
      usuarioEmail: "testeemail@email.com",
      titulo: "Teste",
      descricao: "Testando",
      dataAdicionada: dataAdicionada,
      dataLimite: dataAdicionada,
      dataConclusao: dataAdicionada
    };
    const dadosComSenha = {...newTarefa, usuarioSenha : "senhateste"};
    postTarefa(dadosComSenha)
    .then(() => {
      setTarefas([...tarefas, newTarefa]);
    });
  };

  useEffect(() => {
    async function fetchTarefas() {
      const newTarefas = await getTarefas();
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
