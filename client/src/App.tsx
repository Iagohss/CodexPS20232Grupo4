import { useEffect, useState } from 'react'
import "./App.css"
import Tarefa from "./components/Tarefa"
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

import { doGETALLtarefa } from "./api/getTarefas";
import { doPOSTtarefa } from "./api/postTarefa";
import { DadosComSenha, TTarefa, TarefaNoAutentication} from './api/types';
import { doPUTtarefa } from './api/putTarefa';
import { doDELETEtarefa } from './api/deleteTarefa';

function App() {
  const [tarefas, setTarefas] = useState<TTarefa[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [email, setEmail] = useState("testeemail@email.com");
  const [senha, setSenha] = useState("senhateste");

  const postTarefa = async (newTarefa : TarefaNoAutentication) => {
    const dadosComSenha = {...newTarefa, usuarioEmail: email, usuarioSenha : senha};
    const nTarefa = await doPOSTtarefa(dadosComSenha);
    setTarefas([...tarefas, nTarefa]);
  };

  const putTarefa = async (newTarefa : TTarefa ) => {
    const dadosComSenha : DadosComSenha= {...newTarefa, usuarioSenha : senha};
    const nTarefa = await doPUTtarefa(dadosComSenha);
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === nTarefa.id ? nTarefa : tarefa 
    ));
  };

  const deleteTarefa = async (id : string) => {
    const autentication = {usuarioEmail: email, usuarioSenha : senha}
    doDELETEtarefa(autentication, id).then(() => {
      setTarefas(tarefas.filter(tarefa => 
        !(tarefa.id === id)
      ));
    });
  }

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
      {tarefas
      .filter((tarefa) => 
        filter === "All" 
          ? true 
          : filter === "Completed" 
          ? tarefa.dataConclusao 
          : !tarefa.dataConclusao
      )
      .filter((tarefa) => 
        tarefa.titulo.toLowerCase().includes(search.toLowerCase()) ||
        tarefa.descricao.toLowerCase().includes(search.toLowerCase())
      )
      .map((tarefa) => (
          <Tarefa 
            key={tarefa.id} 
            tarefa={tarefa}
            completeTarefa={putTarefa}
            removeTarefa={deleteTarefa}
          />
      ))}
    </div>
    <TodoForm addTarefa={postTarefa}/>
   </div>
   );
}

export default App
